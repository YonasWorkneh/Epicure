import { PlatformPressable } from "@react-navigation/elements";
import React, { useEffect } from "react";
import { HeartIcon, HomeIcon, UserIcon } from "react-native-heroicons/solid";
import tw from "twrnc";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

type TabBarButtonProps = {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  label: string | React.ReactNode;
};

const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  label,
}: TabBarButtonProps) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.1]);
    const top = interpolate(scale.value, [0, 1], [0, 5]);
    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
      // top,
    };
  });

  return (
    <PlatformPressable
      pressColor="#fff"
      pressOpacity={100}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[tw`flex-row items-center justify-center pl-10`]}
      android_ripple={null}
    >
      {typeof label === "string" &&
        label.toString().toLowerCase() === "home" && (
          <Animated.View
            style={[
              animatedIconStyle,
              tw`${
                isFocused
                  ? "flex-row items-center justify-center h-10 w-10 rounded-full bg-amber-500"
                  : ""
              }`,
            ]}
          >
            <HomeIcon
              size={22}
              style={[tw` ${isFocused ? "text-white" : "text-amber-500"}`]}
            />
          </Animated.View>
        )}
      {typeof label === "string" &&
        label.toString().toLowerCase() === "favorites" && (
          <Animated.View
            style={[
              animatedIconStyle,
              tw`${
                isFocused
                  ? "flex-row items-center justify-center h-10 w-10 rounded-full bg-amber-500"
                  : ""
              }`,
            ]}
          >
            <HeartIcon
              size={22}
              style={[tw` ${isFocused ? "text-white" : "text-amber-500"}`]}
            />
          </Animated.View>
        )}
      {typeof label === "string" &&
        label.toString().toLowerCase() === "profile" && (
          <Animated.View
            style={[
              animatedIconStyle,
              tw`${
                isFocused
                  ? "flex-row items-center justify-center h-10 w-10 rounded-full bg-amber-500"
                  : ""
              }`,
            ]}
          >
            <UserIcon
              size={22}
              style={[tw` ${isFocused ? "text-white" : "text-amber-500"}`]}
            />
          </Animated.View>
        )}
    </PlatformPressable>
  );
};

export default TabBarButton;
