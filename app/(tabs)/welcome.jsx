import tw from "twrnc";
import { View, Text } from "react-native";
import React from "react";

export default function welcome() {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-3xl font-bold`}>welcome</Text>
    </View>
  );
}
