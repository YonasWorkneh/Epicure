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
import Animated, {
  FadeInDown,
  FadeInLeft,
} from "react-native-reanimated";

export default function recipe() {
  type Recipe = {
    id: string;
    title: string;
    ingredients: { description: string; unit: string; quantity: number }[];
    src: string;
    preparedBy: string;
    servings: number;
    cookingTime: number;
    sourceUrl: string;
  };
  const ing = [
    {
      quantity: 4.5,
      unit: "cups",
      description: "unbleached high-gluten bread or all-purpose flour chilled",
    },
    {
      quantity: 1.75,
      unit: "tsps",
      description: "salt",
    },
    {
      quantity: 1,
      unit: "tsp",
      description: "instant yeast",
    },
    {
      quantity: 0.25,
      unit: "cup",
      description: "olive oil",
    },
    {
      quantity: 1.75,
      unit: "cups",
      description: "water ice cold",
    },
    {
      quantity: null,
      unit: "",
      description: "Semolina flour or cornmeal for dusting",
    },
  ];
  const searchParams = useLocalSearchParams();
  const router = useRouter();
  const { id } = searchParams;
  const [recipe, setRecipe] = useState<Recipe>();
  const { setShowTabBar } = useTabContext();
  const [isFavourite, setIsFavourite] = useState(false);
  
  function handleBookmark() {
    setIsFavourite((state) => !state);
    alert(isFavourite ? "Removed from favourite" : "Added to favourite");
  }
  function onOpenDirectionLink() {
    openBrowserAsync(recipe?.sourceUrl ? recipe?.sourceUrl : "");
  }
  useEffect(
    function () {
      async function getRecipe() {
        try {
          const recipeDetail = await getRecipeDetail(
            Array.isArray(id) ? id[0] : id
          );
          setRecipe(recipeDetail);
        } catch (err: any) {
          console.error(err.message);
        }
      }
      //   getRecipe();
    },
    [searchParams]
  );

  //   if (!recipe) return null;
  return (
    <View>
      {/* line */}
      {/* recipe-banner */}
      <View style={tw`w-full h-100 bg-amber-500/50  relative`}>
        <Animated.Image
          style={tw`h-full w-full `}
          source={{
            uri: recipe?.id
              ? recipe?.id
              : "https://innerschweizonline.ch/wordpress/wp-content/uploads/2022/08/Sommerliches-Beef-Tatar.jpg",
          }}
          sharedTransitionTag={Array.isArray(id) ? id[0] : id}
        />
        <CustomButton
          icon={<ArrowLeftIcon style={tw`text-black`} size={22} />}
          backgroundStyles={`absolute top-12 left-5 bg-white w-10 h-10 rounded-full flex-row items-center justify-center`}
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
          backgroundStyles={`absolute top-12 right-5 bg-white w-10 h-10 rounded-full flex-row items-center justify-center`}
          onPress={() => handleBookmark()}
        />
      </View>
      {/* Meal general Info */}
      <View style={tw`bg-white rounded-2rem mt-[-2rem] p-4 px-6 mb-28rem`}>
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
              By {recipe?.preparedBy || "BBC Food"}
            </Text>
          </View>
          {/* icons */}
          <View style={tw`py-2 flex-row items-center gap-10 w-100`}>
            <Animated.View
              entering={FadeInDown.duration(300)}
              style={tw`bg-amber-500/80 rounded-[2rem] items-center py-4 pt-2 px-2 h-26`}
            >
              <View
                style={tw`bg-gray-50/80 w-10 h-10 rounded-full flex-row items-center justify-center`}
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
                {recipe?.cookingTime || 4} {`\n`}SER
              </Text>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.duration(500)}
              style={tw`bg-amber-500/80 rounded-[2rem] items-center py-4 pt-2 px-2 h-26`}
            >
              <View
                style={tw`bg-gray-50/80 w-10 h-10 rounded-full flex-row items-center justify-center`}
              >
                <FireIcon color={"#000000d6"} />
              </View>
              <Text style={[tw`text-[12px] font-bold text-center mt-3`]}>
                {recipe?.cookingTime || 129} {`\n`}CAL
              </Text>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.duration(600)}
              style={tw`bg-amber-500/80 rounded-[2rem] items-center py-4 pt-2 px-2 h-26`}
            >
              <View
                style={tw`bg-gray-50/80 w-10 h-10 rounded-full flex-row items-center justify-center`}
              >
                <CurrencyEuroIcon color={"#000000d6"} />
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

          {ing.map((ingredient, index) => (
            <Animated.View
              entering={FadeInDown.duration(300 + index * 100)}
              style={tw`p-2 flex-row items-center`}
              key={index}
            >
              <View style={tw`rounded-full p-[3px] bg-amber-500 mr-3`}></View>
              <Text style={[tw``, { fontFamily: "Diphylleia-Regular" }]}>
                {ingredient.quantity} {ingredient.unit} {ingredient.description}
              </Text>
            </Animated.View>
          ))}

          {/* Cook detail link */}
          <View style={tw`p-8 px-4 h-40 items-center justify center mb-20`}>
            <Text style={[tw``, { fontFamily: "Diphylleia-Regular" }]}>
              This recipe is carefully designed by{" "}
              <Text style={tw`text-amber-500`}>
                {recipe?.preparedBy || "BBC Food"}
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
