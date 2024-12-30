import React from "react";
import { TouchableOpacity, Text } from "react-native";
import tw from "twrnc";

type ButtonProps = {
  text: string;
  onPress?: () => void;
  backgroundStyles?: string;
  textStyles?: string;
};

const CustomButton: React.FC<ButtonProps> = ({
  text,
  onPress,
  backgroundStyles,
  textStyles,
}) => {
  return (
    <TouchableOpacity
      style={tw`${backgroundStyles ? backgroundStyles : ""}`}
      onPress={onPress}
    >
      <Text style={tw`${textStyles ? textStyles : ""}`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
