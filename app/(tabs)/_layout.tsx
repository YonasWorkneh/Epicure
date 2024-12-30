import React from "react";
import { Tabs } from "expo-router";
import TabItem from "@/components/Tab";
import { HeartIcon, HomeIcon, UserIcon } from "react-native-heroicons/solid";
import tw from "twrnc";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: [
            tw`flex items-center justify-center bg-amber-500 rounded-full m-5 h-18`,
            { boxShadow: "0px -20px 20px rgba(0, 0, 0, 0.128)" },
          ],
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <TabItem
                title="home"
                focused={focused}
                icon={<HomeIcon style={tw`text-black`} />}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <TabItem
                title="favorites"
                focused={focused}
                icon={<HeartIcon style={tw`text-black`} />}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <TabItem
                title="profile"
                focused={focused}
                icon={<UserIcon style={tw`text-black`} />}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
