import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import tw from "twrnc";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInRight } from "react-native-reanimated";

import images from "@/constants/images";
import { signUp } from "@/lib/api/user";
import CustomButton from "@/components/CustomButton";
import AuthForm from "@/components/AuthForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

interface SignUpErrors {
  email?: string;
  password?: string;
}

export default function signup() {
  const [signingUp, setSigningUp] = useState(false);
  const router = useRouter();
  const [signUpErrors, setSignUpErrors] = useState<SignUpErrors>({});
  const handleSignUp = async (
    email: string,
    password: string,
    clear: () => void
  ) => {
    try {
      setSigningUp(true);
      const res = await signUp(email, password);
      await AsyncStorage.setItem("userId", JSON.stringify(res.id));
      showMessage({
        message: `Welcome to Epicure our new user. Please sign in to your account to get the most out of our app.`,
        backgroundColor: "rgb(245 158 11)",
        color: "#fff",
        statusBarHeight: 40,
        duration: 5000,
      });
      router.navigate("/(auth)/signin");
      clear();
    } catch (err: any) {
      const errMessage = JSON.parse(err.message);
      setSignUpErrors(errMessage);
    } finally {
      setTimeout(() => setSigningUp(false), 1000);
    }
  };

  return (
    <SafeAreaView style={tw`h-full bg-white`}>
      <ScrollView>
        <CustomButton
          text="Skip"
          onPress={() => router.push("/(tabs)/home")}
          backgroundStyles="px-4 py-4 bg-white w-rfull"
          textStyles="text-amber-500 font-bold text-right"
        />
        <Animated.View entering={FadeInRight.duration(1000)}>
          <Image
            source={images.signUpBg}
            style={[tw`w-full`, { width: hp(50), height: hp(40) }]}
          />
        </Animated.View>
        <AuthForm
          title="Create Account"
          type="signup"
          onSubmit={handleSignUp}
          errors={signUpErrors}
          loadingState={signingUp}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
