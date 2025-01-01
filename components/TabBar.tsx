import { View } from "react-native";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import tw from "twrnc";
import TabBarButton from "./TabBarButton";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View
      style={[
        tw`flex-row items-center justify-between bg-white rounded-full absolute bottom-3`,
        {
          shadowColor: "#0000009b",
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 10,
          shadowOpacity: 0.3,
          padding: 12,
          marginHorizontal: 50,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined &&
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            label={label}
            isFocused={isFocused}
          />
        );
      })}
    </View>
  );
}
