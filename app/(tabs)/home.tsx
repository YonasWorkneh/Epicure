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
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

export default function home() {
  const handleSearch = () => {};
  const [activeCategory, setActiveCategory] = useState(categories[0].name);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const recipes = await getRecipesByCategory(activeCategory);
        console.log(recipes);
        setRecipes(recipes);
      } catch (err) {
        console.error(err);
        throw err;
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
      <Categories categories={categories} onSetCategory={setActiveCategory} />
      <FlatList
        data={categories}
        renderItem={({ item, index }) => (
          <RecipeListItem title={item.name} src={item.src} index={index} />
        )}
        keyExtractor={(item) => item.src}
        numColumns={2}
        contentContainerStyle={tw`p-4`}
        ListFooterComponent={<View style={{ height: 150 }} />}
      />
    </SafeAreaView>
  );
}
