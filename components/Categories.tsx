import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import Animated, { FadeInDown } from "react-native-reanimated";

type categoriesProp = {
  categories: { name: string; src: ImageBitmap }[];
  onSetCategory: (category: string) => void;
};

export default function categories({
  categories,
  onSetCategory,
}: categoriesProp) {
  return (
    <View style={tw`flex flex-row justify-between p-4 py-5`}>
      {categories.map(({ name, src }, index) => {
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => onSetCategory(name)}
          >
            <Animated.View
              style={tw`items-center `}
              entering={FadeInDown.duration((index + 4) * 100)}
            >
              <View style={tw`relative h-10 w-10 bg-amber-500/80 rounded-full`}>
                <Image
                  source={src}
                  style={tw`h-10 w-10 rounded-full bg-amber-500/10 absolute top-0 left-0 opacity-50`}
                />
              </View>
              <Text
                style={[
                  tw`text-gray-500 text-[11px]`,
                  { fontFamily: "Poppins-Regular" },
                ]}
              >
                {name}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
