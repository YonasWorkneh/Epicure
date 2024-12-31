import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  NativeScrollEvent,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Slot, Stack } from "expo-router";
import { useFonts } from "expo-font";
import changeNavigationBarColor, {
  hideNavigationBar,
} from "react-native-navigation-bar-color";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [scrollY, setScrollY] = useState(0);

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
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
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
        <Stack.Screen name="profile" options={{ headerShown: false }} />
      </ScrollView>
    </Stack>
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
