import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import tw from "twrnc";
import Animated, { FadeInDown } from "react-native-reanimated";
import CategoryItem from "./CategoryItem";

type categoriesProp = {
  categories: { id: string; meal: string; mealImg: string }[];
  onSetCategory: (category: string) => void;
};

export default function categories({
  categories,
  onSetCategory,
}: categoriesProp) {
  return (
    <>
      <FlatList
        data={categories}
        renderItem={({ item, index }) => (
          <CategoryItem
            name={item.meal}
            src={item.mealImg}
            id={item.id}
            onSetCategory={onSetCategory}
            index={index}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`items-center justify-between p-4 py-5 gap-5 my-3`}
        horizontal
      />
    </>
  );
}
