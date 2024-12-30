import { View, Text, StatusBar, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import CustomButton from "@/components/customButton";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/solid";
import Error from "@/components/error";
import AuthForm from "@/components/AuthForm";

export default function signup() {
  function handleSubmit() {}
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [visibility, setVisibility] = useState(false);
  const router = useRouter();

  const handleForgotPassword = () => {};
  const handleSignUp = () => {};

  return (
    <SafeAreaView style={tw`h-full bg-white`}>
      <ScrollView>
        <CustomButton
          text="Skip"
          onPress={() => router.push("/(tabs)/home")}
          backgroundStyles="px-4 py-4 bg-white w-rfull"
          textStyles="text-amber-500 font-bold text-right"
        />
        <View>
          <Image source={images.signUpBg} style={tw`w-full h-85`} />
        </View>
        <AuthForm
          title="Create Account"
          type="signup"
          onSubmit={handleSignUp}
          onForgotPassword={handleForgotPassword}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
