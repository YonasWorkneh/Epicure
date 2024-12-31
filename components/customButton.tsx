import React from "react";
import { TouchableOpacity, Text } from "react-native";
import tw from "twrnc";

type ButtonProps = {
  text?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  backgroundStyles?: string;
  textStyles?: string;
  textFont?: string;
  tapOpacity?: number;
};

const CustomButton: React.FC<ButtonProps> = ({
  text,
  onPress,
  backgroundStyles,
  textStyles,
  icon,
  textFont,
  tapOpacity,
}) => {
  return (
    <TouchableOpacity
      style={tw`${backgroundStyles ? backgroundStyles : ""}`}
      onPress={onPress}
      activeOpacity={tapOpacity}
    >
      {icon ? icon : ""}
      <Text
        style={[tw`${textStyles ? textStyles : ""}`, { fontFamily: textFont }]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
