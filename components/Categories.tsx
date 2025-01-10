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
        ListHeaderComponent={
          <CategoryItem
            name={"All"}
            src={
              "https://www.simplyrecipes.com/thmb/FRlM2EEuix3dh1WxFD2R_Gp-V4c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Most-Popular-Recipes-Feature-LEAD-04-b4cc7e7bcfbe486586053a8e0a927d2f.jpg"
            }
            id={"giberish"}
            index={-1}
            onSetCategory={onSetCategory}
          />
        }
        renderItem={({ item, index }) => (
          <CategoryItem
            name={item.meal}
            src={item.mealImg}
            id={item.id}
            onSetCategory={onSetCategory}
            index={index}
            key={item.id}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`justify-between p-4 py-0 gap-5 mt-3 h-28`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
}
