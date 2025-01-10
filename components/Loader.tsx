import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import tw from "twrnc";

const Loader: React.FC = () => {
  return (
    <View style={tw`h-full items-center justify-center w-full mt-[-7rem]`}>
      <ActivityIndicator size="large" color="rgb(245 158 11)" />
    </View>
  );
};

export default Loader;
