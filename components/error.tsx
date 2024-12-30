import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

type ErrorProps = {
  text?: string;
  styles?: string;
};

const Error: React.FC<ErrorProps> = ({
  text = "Password must be at least 8 characters long",
  styles,
}) => {
  return (
    <View style={tw`mt-1`}>
      <Text
        style={tw`text-[12px] text-gray-500 mt-2 text-red-500 ${
          styles ? styles : ""
        }`}
      >
        {text}
      </Text>
    </View>
  );
};

export default Error;
