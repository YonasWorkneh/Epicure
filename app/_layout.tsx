import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  NativeScrollEvent,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import { TabContextProvider } from "@/contexts/TabContext";
import FlashMessage from "react-native-flash-message";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [scrollY, setScrollY] = useState(0);
  const [hideSplash, setHideSplash] = useState(false);

  const handleScroll = (event: any) => {
    alert("event fired");
    console.log(event.nativeEvent.contentOffset.y);
    setScrollY(event.nativeEvent.contentOffset.y);
  };

  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "PlayWrite-Regular": require("../assets/fonts/PlaywriteAUVICGuides-Regular.ttf"),
    "Diphylleia-Regular": require("../assets/fonts/Diphylleia-Regular.ttf"),
  });

  useEffect(() => {
    setTimeout(() => setHideSplash(true), 1000);
    if (error) throw error;

    if (fontsLoaded && hideSplash) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error, hideSplash]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <TabContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <ScrollView onScroll={handleScroll}>
          {scrollY > 0 && (
            <LinearGradient
              colors={["rgba(217, 12, 12, 0.3)", "transparent"]}
              style={tw`absolute top-0 left-0 right-0 h-20`}
            />
          )}
          <StatusBar
            backgroundColor="rgb(245 158 11)"
            barStyle={"light-content"}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </ScrollView>
      </Stack>
      <FlashMessage position={"top"} />
    </TabContextProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
