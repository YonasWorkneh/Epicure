import { View, Text, ScrollView } from "react-native";

import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getRecipeDetail } from "@/lib/api/recipe";
import {
  ArrowLeftIcon,
  ClockIcon,
  CurrencyEuroIcon,
  FireIcon,
  HeartIcon,
  UserGroupIcon,
} from "react-native-heroicons/solid";
import tw from "twrnc";
import CustomButton from "@/components/CustomButton";
import { openBrowserAsync } from "expo-web-browser";
import { useTabContext } from "@/contexts/TabContext";
import Animated, { FadeInDown, FadeInLeft } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomModal from "@/components/Modal";

export default function recipe() {
  const searchParams = useLocalSearchParams();
  const { id, api } = searchParams;

  type Recipe = {
    id: string;
    title: string;
    ingredients: string[];
    publisher: string;
    servings: number;
    cookingTime: number;
    sourceUrl: string;
    imageUrl: string;
  };

  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe>();
  const { setShowTabBar } = useTabContext();
  const [isFavourite, setIsFavourite] = useState(false);
  const randomCal = Math.floor(Math.random() * (800 - 150 + 1)) + 150;
  const [showModal, setShowModal] = useState(false);

  async function handleBookmark() {
    const id = await AsyncStorage.getItem("userId");
    if (!id) setShowModal(true);
  }
  function onOpenDirectionLink() {
    openBrowserAsync(recipe?.sourceUrl ? recipe?.sourceUrl : "");
  }
  useEffect(() => {
    async function getRecipe() {
      try {
        const recipeDetail = await getRecipeDetail(
          Array.isArray(id) ? id[0] : id,
          Array.isArray(api) ? api[0] : api
        );
        let recipeObject: Recipe = {
          id: "",
          title: "",
          ingredients: [],
          publisher: "meal Db",
          servings: 0,
          cookingTime: 0,
          imageUrl: "",
          sourceUrl: "",
        };

        if (api === "forkify") {
          // Convert snake_case to camelCase
          const camelCasedKeys = Object.keys(recipeDetail).map((key) =>
            key
              .split("_")
              .map((subKeys, index) =>
                index === 0
                  ? subKeys[0].toLowerCase() + subKeys.slice(1)
                  : subKeys[0].toUpperCase() + subKeys.slice(1)
              )
              .join("")
          );

          recipeObject = Object.keys(recipeDetail).reduce(
            (recipeObj: any, key: string, index: number) => {
              recipeObj[camelCasedKeys[index]] =
                key === "ingredients"
                  ? recipeDetail[key].map(
                      (ing: any) =>
                        `${ing.quantity || ""} ${ing.unit || ""} ${
                          ing.description || ""
                        }`
                    )
                  : recipeDetail[key];
              return recipeObj;
            },
            {}
          );
        } else {
          Object.keys(recipeDetail).forEach((key) => {
            if (key === "idMeal") recipeObject.id = recipeDetail[key];
            if (key.includes("Ingredient") && recipeDetail[key]) {
              const index = +key.slice(key.lastIndexOf("t") + 1);
              console.log(index);
              recipeObject.ingredients[index - 1] =
                recipeDetail[`strMeasure${index}`] + " " + recipeDetail[key];
            }
            if (key === "strMeal") recipeObject.title = recipeDetail[key];
            if (key.includes("Youtube")) {
              recipeObject.sourceUrl = recipeDetail[key]
                ? recipeDetail[key]
                : recipeDetail["strSource"];
            }
            if (key.includes("Thumb"))
              recipeObject.imageUrl = recipeDetail[key];
          });
          recipeObject.cookingTime =
            Math.floor(Math.random() * (120 - 45 + 1)) + 45;
          console.log(recipeObject);
        }

        // Only update state if the recipe is different
        setRecipe(recipeObject);
      } catch (err: any) {
        // console.error(err.message);
      }
    }

    getRecipe();
  }, [id, api]);

  if (!recipe) return null;
  return (
    <View key={Array.isArray(id) ? id[0] : id}>
      {/* line */}
      {/* recipe-banner */}
      <View style={tw`w-full h-100 bg-amber-500/50  relative`}>
        <Animated.Image
          style={tw`h-full w-full `}
          source={{
            uri: recipe?.imageUrl
              ? recipe?.imageUrl
              : "https://innerschweizonline.ch/wordpress/wp-content/uploads/2022/08/Sommerliches-Beef-Tatar.jpg",
          }}
          sharedTransitionTag={Array.isArray(id) ? id[0] : id}
        />
        <CustomButton
          icon={<ArrowLeftIcon style={tw`text-black`} size={22} />}
          backgroundStyles={`absolute top-8 left-5 bg-white w-10 h-10 rounded-full flex-row items-center justify-center`}
          onPress={() => {
            router.back();
            setShowTabBar(true);
          }}
        />
        <CustomButton
          icon={
            <HeartIcon
              style={tw`${
                isFavourite ? "text-amber-500" : "text-black/50"
              } font-bold ml-1`}
              size={25}
            />
          }
          backgroundStyles={`absolute top-8 right-5 bg-white w-10 h-10 rounded-full flex-row items-center justify-center`}
          onPress={() => handleBookmark()}
        />
      </View>
      {/* Meal general Info */}
      <View style={tw`bg-white rounded-3rem mt-[-4rem] p-4 px-5 mb-28rem`}>
        <View style={tw`w-full items-center justify-center mb-4 bg-white/0`}>
          <View style={tw`w-15 h-1 bg-gray-500/30 rounded-full`}></View>
        </View>
        <Animated.ScrollView
          style={tw`bg-white mb-20rem`}
          showsVerticalScrollIndicator={false}
        >
          <View style={tw`py-2`}>
            <Animated.Text
              entering={FadeInLeft.duration(400)}
              style={[
                tw`text-[1.6rem] font-bold text-black/70`,
                { fontFamily: "Diphylleia-Regular" },
              ]}
            >
              {recipe?.title || "Egg Tar with bendicts "}
            </Animated.Text>
            <Text
              style={[
                tw`text-[12px] font-bold text-black/40 py-2`,
                { fontFamily: "Diphylleia-Regular" },
              ]}
            >
              By {recipe?.publisher || "BBC Food"}
            </Text>
          </View>
          {/* icons */}
          <View style={tw`py-2 flex-row items-center gap-10 w-100`}>
            <Animated.View
              entering={FadeInDown.duration(300)}
              style={tw`bg-amber-500/80 rounded-[2rem] items-center py-4 pt-2 px-2 h-26`}
            >
              <View
                style={tw`bg-gray-50/80 w-10 h-10 rounded-full flex-row items-center justify-center `}
              >
                <ClockIcon color={"#000000d6"} />
              </View>
              <Text style={tw`text-[12px] font-bold text-center mt-3`}>
                {recipe?.cookingTime || 45} {`\n`}MIN
              </Text>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.duration(400)}
              style={tw`bg-amber-500/80 rounded-[2rem] items-center justify-center py-4 pt-2 px-2 h-26`}
            >
              <View
                style={tw`bg-gray-50/80 w-10 h-10 rounded-full flex-row items-center justify-center`}
              >
                <UserGroupIcon color={"#000000d6"} />
              </View>
              <Text style={tw`text-[12px] font-bold text-center mt-3`}>
                {recipe?.servings || 4} {`\n`}SER
              </Text>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.duration(500)}
              style={tw`bg-amber-500/80 rounded-[2rem] items-center py-4 pt-2 px-2 h-26`}
            >
              <View
                style={tw`bg-gray-50/80 w-10 h-10 rounded-full flex-row items-center justify-center`}
              >
                <FireIcon color={"#000"} />
              </View>
              <Text style={[tw`text-[12px] font-bold text-center mt-3`]}>
                {randomCal} {`\n`}CAL
              </Text>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.duration(600)}
              style={tw`bg-amber-500/80 rounded-[2rem] items-center py-4 pt-2 px-2 h-26`}
            >
              <View
                style={tw`bg-gray-50/80 w-10 h-10 rounded-full flex-row items-center justify-center`}
              >
                <CurrencyEuroIcon color={"#000000"} />
              </View>
              <Text style={tw`text-[12px] font-bold text-center mt-3`}>
                Free
              </Text>
            </Animated.View>
          </View>
          {/* ingredients */}
          <Text
            style={[
              tw`text-xl font-bold mt-5 mb-3`,
              { fontFamily: "Diphylleia-Regular" },
            ]}
          >
            Ingredients
          </Text>

          {recipe?.ingredients.map((ingredient, index) => (
            <Animated.View
              entering={FadeInDown.duration(300 + index * 100)}
              style={tw`p-2 flex-row items-center`}
              key={index}
            >
              <View style={tw`rounded-full p-[3px] bg-amber-500 mr-3`}></View>
              <Text style={[tw``, { fontFamily: "Diphylleia-Regular" }]}>
                {ingredient}
              </Text>
            </Animated.View>
          ))}

          {/* Cook detail link */}
          <View style={tw`p-8 px-4 h-40 items-center justify center mb-20`}>
            <Text
              style={[tw`text-center`, { fontFamily: "Diphylleia-Regular" }]}
            >
              This recipe is carefully designed by{" "}
              <Text style={tw`text-amber-500 text-center`}>
                {recipe?.publisher
                  ? recipe?.publisher?.length > 10
                    ? "\n"
                    : ""
                  : ""}
                {recipe?.publisher || "BBC Food"}
              </Text>
              .
            </Text>
            <CustomButton
              text="Learn more"
              backgroundStyles="bg-amber-500 w-30 items-center rounded-full p-2 mt-8"
              textStyles="text-white"
              textFont="Diphylleia-Regular"
              onPress={() => onOpenDirectionLink()}
            />
          </View>
        </Animated.ScrollView>
      </View>
      {showModal && (
        <CustomModal
          visible={showModal}
          content={`You are not signed in yet. You need to sign in to \nsave your  favorite recipes.`}
          title="Epicure"
          onClose={() => setShowModal(false)}
          modalStyles="bg-white p-4 px-6 rounded-lg items-center "
          action={
            <CustomButton
              text="Sign in"
              textStyles="text-white font-bold"
              backgroundStyles="bg-amber-500 rounded-lg p-2 px-4"
              onPress={() => {
                router.navigate(`/(auth)/signin?rerender=${true}`);
                setShowModal(false);
              }}
            />
          }
        />
      )}
    </View>
  );
}

type IngredientItemType = {
  ingredient: string;
  unit: string;
  quantity: number;
};
const IngredientItem = ({ ingredient, unit, quantity }: IngredientItemType) => {
  return (
    <View style={tw`py-2 flex-row items-center`}>
      <View style={tw`rounded-full p-[3px] bg-amber-500 mr-3`}></View>
      <Text style={[tw``, { fontFamily: "Diphylleia-Regular" }]}>
        {quantity} {unit} {ingredient}
      </Text>
    </View>
  );
};
