import React from "react";
import { Link, Tabs } from "expo-router";
import TabBar from "@/components/TabBar";
import Sidebar from "@/components/Sidebar";
import { useTabContext } from "@/contexts/TabContext";
import { Image, Text, View } from "react-native";
import MenuIcon from "@/components/MenuIcon";
import tw from "twrnc";
import CustomButton from "@/components/CustomButton";
import images from "@/constants/images";

export default function TabLayout() {
  const { menuOpened } = useTabContext();
  return (
    <>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
          // header: <Top />,
          // heade
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

function Top() {
  return (
    // header
    <View style={tw`px-4 flex flex-row  justify-between items-center mt-3`}>
      <CustomButton icon={<MenuIcon />} />
      <Text
        style={[
          tw`font-semibold text-2xl text-amber-500`,
          { fontFamily: "Poppins-Bold" },
        ]}
      >
        Epicure
      </Text>
      <Link href={"./profile"}>
        <Image source={images.avatar} style={tw`w-10 h-10`} />
      </Link>
    </View>
  );
}
