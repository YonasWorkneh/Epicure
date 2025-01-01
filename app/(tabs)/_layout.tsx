import React from "react";
import { Tabs } from "expo-router";
import TabBar from "@/components/TabBar";
import Sidebar from "@/components/Sidebar";
import { useTabContext } from "@/contexts/TabContext";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

export default function TabLayout() {
  const { menuOpened } = useTabContext();
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
      {menuOpened && <Sidebar />}
    </>
  );
}
