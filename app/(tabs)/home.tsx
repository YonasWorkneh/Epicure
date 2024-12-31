import { View, Text, Image, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Link } from "expo-router";
import images from "../../constants/images";
import SearchBar from "@/components/SearchBar";
import Animated, { FadeInLeft } from "react-native-reanimated";

import CustomButton from "@/components/CustomButton";
import Categories from "@/components/Categories";
import { getRecipesByCategory } from "@/lib/api/recipe";

export default function home() {
  const handleSearch = () => {};
  const [activeCategory, setActiveCategory] = useState(categories[0].name);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const recipes = await getRecipesByCategory(activeCategory);
      console.log(recipes);
    };
    getRecipes();
  }, [activeCategory]);

  return (
    <SafeAreaView>
      {/* header */}
      <View style={tw`px-4 flex flex-row  justify-between items-center`}>
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
        <Text style={tw`text-sm font-semibold mb-5`}>Hello {"user"},</Text>
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
        style={tw`p-4`}
        data={categories}
        renderItem={({ item }) => (
          <RecipeItem title={item.name} src={item.src} />
        )}
        keyExtractor={(item) => item.src}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

const MenuIcon = () => {
  return (
    <View style={tw`flex flex-col justify-center w-5 h-10 `} aria-label="Menu">
      <View style={tw`w-2 h-0.5 bg-black rounded-full mb-1`}></View>
      <View style={tw`w-4 h-0.5 bg-black rounded-full mb-1`}></View>
      <View style={tw`w-3 h-0.5 bg-black rounded-full self-end`}></View>
    </View>
  );
};

const categories = [
  {
    name: "All",
    src: images.all,
  },
  {
    name: "Dessert",
    src: images.sweet,
  },
  {
    name: "Beef",
    src: images.steak,
  },
  {
    name: "Savory",
    src: images.savory,
  },
  {
    name: "Vegan",
    src: images.vegan,
  },
  {
    name: "Italian",
    src: images.vegan,
  },
];

type RecipeItemProps = {
  title: string;
  src: ImageBitmapSource;
};

const RecipeItem = ({ title, src }: RecipeItemProps) => {
  return (
    <View style={tw`m-2`}>
      <View>
        <Image source={src} style={[tw`h-50 w-40 rounded-lg`]} />
      </View>
      <Text>{title}</Text>
    </View>
  );
};
