import React from "react";
import { Tabs } from "expo-router";
import TabItem from "@/components/TabIcon";
import { HeartIcon, HomeIcon, UserIcon } from "react-native-heroicons/solid";
import tw from "twrnc";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import TabBar from "@/components/TabBar";

export default function TabLayout() {
  return (
    <>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="home" options={{ title: "Home" }} />
        <Tabs.Screen name="favorites" options={{ title: "Favorites" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </>
  );
}
