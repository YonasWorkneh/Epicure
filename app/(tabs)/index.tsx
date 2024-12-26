import { Text, View } from "react-native";
import tw from "twrnc";
import React from "react";
import { Link } from "expo-router";

const HomeScreen = () => {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-3xl font-bold bg-`}>Home Screen</Text>
      <Link href={"/(tabs)/profile"}>Profile</Link>
      <Link href={"/(tabs)/welcome" as "/(tabs)/profile"}>Welcome</Link>
    </View>
  );
};

export default HomeScreen;
