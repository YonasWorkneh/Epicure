import { View, Text, Image, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Link } from "expo-router";
import images from "../../constants/images";
import SearchBar from "@/components/SearchBar";
import Animated, { FadeInDown, FadeInLeft } from "react-native-reanimated";

import CustomButton from "@/components/CustomButton";
import Categories from "@/components/Categories";
import { getRecipesByCategory } from "@/lib/api/recipe";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import RecipeListItem from "@/components/RecipeListItem";
import { categories } from "@/constants/Categories";
import MenuIcon from "@/components/MenuIcon";
import Loader from "@/components/Loader";

export default function home() {
  const handleSearch = () => {};
  const [activeCategory, setActiveCategory] = useState(categories[0].strMeal);
  const [isLoading, setIsLoading] = useState(false);
  const mealObject = (
    meals: { idMeal: string; strMeal: string; strMealThumb: string }[]
  ) =>
    meals.map((meal) => {
      return {
        id: meal.idMeal,
        meal: meal.strMeal,
        mealImg: meal.strMealThumb,
      };
    });
  const [recipes, setRecipes] = useState(mealObject(categories));

  useEffect(() => {
    const getRecipes = async () => {
      try {
        setIsLoading(true);
        const recipes = await getRecipesByCategory(activeCategory);
        if (!Array.isArray(recipes) || !recipes.length)
          throw new Error("Invalid recipes");
        setRecipes(mealObject(recipes));
      } catch (err) {
        console.error(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    };
    getRecipes();
  }, [activeCategory]);

  return (
    <SafeAreaView style={tw`h-full w-full`}>
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
        <Link href={"./profile"}>
          <Image source={images.avatar} style={tw`w-10 h-10`} />
        </Link>
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
          Hello {"user"},
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
        categories={mealObject(categories)}
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
