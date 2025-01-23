import { View, Text, Image, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Link, router } from "expo-router";
import images from "../../constants/images";
import SearchBar from "@/components/SearchBar";
import Animated, { FadeInDown, FadeInLeft } from "react-native-reanimated";

import CustomButton from "@/components/CustomButton";
import Categories from "@/components/Categories";
import {
  getCategories,
  getRecipesByCategory,
  getRecipesSearch,
} from "@/lib/api/recipe";
import RecipeListItem from "@/components/RecipeListItem";
import MenuIcon from "@/components/MenuIcon";
import Loader from "@/components/Loader";
import { mealForkify, mealObject } from "@/lib/utils/utils";
import { fetchUser } from "@/lib/api/user";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useTabContext } from "@/contexts/TabContext";
import { showMessage } from "react-native-flash-message";

interface User {
  id: number;
  name?: string;
  email: string;
  password: string;
  image?: string;
  favorites?: string;
}

export default function home() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState(mealObject(categories));
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeUser, setActiveUser] = useState<User>({
    id: 0,
    email: "",
    password: "",
  });
  const searchParams = useLocalSearchParams();
  const { clear } = searchParams;
  const { setActiveTab, setShowTabBar } = useTabContext();

  const handleSearch = async (key: string, reset?: boolean) => {
    if (reset) {
      setActiveCategory("all");
      return;
    }
    try {
      const result = await getRecipesSearch(key);
      const { fkyRecipes, mdbRecipes } = result;
      setRecipes([...mealForkify(fkyRecipes), ...mealObject(mdbRecipes)]);
    } catch (err: any) {
      showMessage({
        message: "Something went wrong. Please try again",
        type: "danger",
      });
    }
  };
  // const fetch active recipe category
  useEffect(() => {
    const getCategoriesList = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (err: any) {
        showMessage({
          message:
            "Something went wrong. Make sure you are connected to the internet.",
          type: "danger",
        });
      }
    };
    const getRecipes = async () => {
      try {
        setIsLoading(true);
        const recipes = await getRecipesByCategory(activeCategory);
        if (!Array.isArray(recipes) || !recipes.length)
          throw new Error("Invalid recipes");
        setRecipes(mealObject(recipes));
      } catch (err) {
        showMessage({
          message:
            "Something went wrong. Make sure you are connected to the internet.",
          type: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    };
    getRecipes();
    getCategoriesList();
  }, [activeCategory]);

  // fetch user related data
  useEffect(function () {
    const getUser = async () => {
      try {
        const user = await fetchUser();
        setActiveUser(user);
      } catch (err: any) {}
    };
    getUser();
    setActiveTab("home");
  }, []);

  useEffect(
    function () {
      setActiveUser({ id: 0, name: "", email: "", password: "" });
    },
    [clear]
  );

  return (
    <SafeAreaView
      style={tw`h-full w-full`}
      key={clear ? (Array.isArray(clear) ? clear[0] : clear) : ""}
    >
      {/* header */}
      <View style={tw`px-4 flex flex-row  justify-between items-center mt-3`}>
        <CustomButton icon={<MenuIcon />} />
        <Text
          style={[
            tw`font-semibold text-2xl text-amber-500`,
            { fontFamily: "Poppins-Bold" },
          ]}
        >
          Epicure
        </Text>
        <CustomButton
          icon={
            <Image
              source={
                activeUser.image
                  ? { uri: activeUser.image } //user uploaded image
                  : require("../../assets/images/avatar.png") // Fallback to default
              }
              style={tw`w-15 h-15 rounded-full`}
            />
          }
          onPress={() => {
            router.push("/(tabs)/profile");
            setShowTabBar(false);
          }}
        />
      </View>

      {/* main-content */}

      {/* heading */}
      <Animated.View style={tw`px-4 mt-5`} entering={FadeInLeft.duration(1000)}>
        <Text
          style={[
            tw`text-sm font-semibold mb-5`,
            { fontFamily: "Poppins-Bold" },
          ]}
        >
          Hello {activeUser.name ? activeUser.name : "user"},
        </Text>
        <Text
          style={[
            tw`text-2xl font-semibold text-gray-500`,
            { fontFamily: "Diphylleia-Regular" },
          ]}
        >
          Your recipe journey with{" "}
          <Text style={tw`font-semibold text-3xl text-amber-500`}>
            {" "}
            Epicure
          </Text>{" "}
          starts here !
        </Text>
      </Animated.View>

      {/* search-bar */}
      <View style={tw`px-4 mt-5`}>
        <SearchBar onSearch={handleSearch} />
      </View>

      {/* categories */}
      <Categories
        categories={mealObject(categories, true)}
        onSetCategory={setActiveCategory}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={recipes}
          renderItem={({ item, index }) => (
            <RecipeListItem
              title={item.meal}
              src={item.mealImg}
              index={index}
              id={item.id}
              key={item.id}
              api={item.api}
            />
          )}
          keyExtractor={(item, index) => item.id + index}
          numColumns={2}
          contentContainerStyle={tw`p-4`}
          ListFooterComponent={<View style={{ height: 150 }} />}
        />
      )}
    </SafeAreaView>
  );
}
