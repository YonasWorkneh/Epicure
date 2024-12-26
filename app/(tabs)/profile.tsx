import tw from "twrnc";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

const profile = () => {
  return (
    <View style={tw`flex-1 font-`}>
      <Text>profile</Text>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
  },
});
