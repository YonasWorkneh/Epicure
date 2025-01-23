import tw from "twrnc";
import { View, Text, Image, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import images from "../constants/images";
import { useRouter } from "expo-router";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomButton from "@/components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  const outerRingPadding = useSharedValue(0);
  const innerRingPadding = useSharedValue(0);
  const router = useRouter();
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(function () {
    const checkIfFirstTime = async () => {
      const hasLaunched = await AsyncStorage.getItem("userId");
      if (!hasLaunched) await AsyncStorage.setItem("hasLaunched", "true");
      else setIsFirstTime(false);
      // await AsyncStorage.removeItem("hasLaunched");
      if (hasLaunched) router.push("/(tabs)/home");
    };
    checkIfFirstTime();
  }, []);

  useEffect(() => {
    innerRingPadding.value = 0;
    outerRingPadding.value = 0;
    setTimeout(() => {
      innerRingPadding.value = withSpring(innerRingPadding.value + hp(5));
    }, 1100);
    setTimeout(() => {
      outerRingPadding.value = withSpring(outerRingPadding.value + hp(5));
    }, 1300);
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center bg-amber-500`}>
      <View style={tw`mb-10`}>
        <Animated.View
          style={[tw`rounded-full bg-white/20`, { padding: outerRingPadding }]}
        >
          <Animated.View
            style={[
              tw`rounded-full justify-center bg-white/20`,
              { padding: innerRingPadding },
            ]}
          >
            <Image
              source={images.foodsvg}
              style={{ width: hp(15), height: hp(15) }}
              resizeMode="contain"
            />
          </Animated.View>
        </Animated.View>
      </View>
      <View style={tw`flex items-center space-y-10 justify-between px-10`}>
        <Text
          style={[
            tw`text-white text-5xl font-bold mb-8 py-5 `,
            { fontFamily: "Poppins-Bold" },
          ]}
        >
          Epicure
        </Text>
        <Text
          style={[
            tw`text-center mb-20 text-[16px] text-center text-white`,
            { fontFamily: "Poppins-Bold" },
          ]}
        >
          Get over{" "}
          <Text style={tw`font-extrabold text-2xl text-[#000] p-15`}>
            100k+{" "}
          </Text>
          recipes from across the globe and cook like a pro.
        </Text>
        <CustomButton
          text="Get Started"
          onPress={() => {
            router.push(isFirstTime ? "/(auth)/signup" : "/(tabs)/home");
          }}
          backgroundStyles="bg-black w-full text-white py-2 px-15 rounded-full"
          textStyles="text-center text-white text-m"
          textFont="Poppins-Regular"
          tapOpacity={0.8}
        />
      </View>
      <StatusBar barStyle={"dark-content"} backgroundColor="rgb(245 158 11)" />
    </SafeAreaView>
  );
}
