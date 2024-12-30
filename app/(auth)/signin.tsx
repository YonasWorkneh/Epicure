import { View, Text, StatusBar, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import CustomButton from "@/components/customButton";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/solid";
import AuthForm from "@/components/AuthForm";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function signup() {
  function handleSubmit() {} // Add your logic here
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [visibility, setVisibility] = useState(false);
  const router = useRouter();

  const handleForgotPassword = () => {};
  const handleSignIn = () => {};

  return (
    <SafeAreaView style={tw`h-full bg-white`}>
      <ScrollView>
        <Animated.View entering={FadeInRight.duration(1000)}>
          <Image
            source={images.signUpBg}
            style={[tw`contain `,{ width: hp(50), height: hp(40) }]}
          />
        </Animated.View>
        <AuthForm
          title="Sign In"
          type="signin"
          onSubmit={handleSignIn}
          onForgotPassword={handleForgotPassword}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
