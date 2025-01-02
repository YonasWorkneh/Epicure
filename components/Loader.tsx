import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import tw from "twrnc";

const Loader: React.FC = () => {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <ActivityIndicator size="large" color="rgb(245 158 11)" />
    </View>
  );
};

export default Loader;
