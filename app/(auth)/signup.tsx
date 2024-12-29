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
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";

export default function signup() {
  function handleSubmit() {}
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [visibility, setVisibility] = useState(false);
  const router = useRouter();

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
        <View
          style={tw`p-8 mt-[-2rem] bg-white rounded-tr-[40px] rounded-tl-[50px] h-full shadow-3xl `}
        >
          <Text style={tw`text-2xl font-bold text-amber-500 mb-10`}>
            Create Account
          </Text>
          <View style={tw`mb-6`}>
            <Text style={tw`text-sm text-gray-700 mb-1 text-[12px] opacity-30`}>
              EMAIL ADDRESS
            </Text>
            <TextInput
              style={tw`border-b border-gray-300 pb-2 focus:border-amber-500`}
              placeholderTextColor="#A1A1A1"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={tw`mb-6`}>
            <Text style={tw`text-sm text-gray-700 mb-1 text-[12px] opacity-30`}>
              PASSWORD
            </Text>
            <View>
              <TextInput
                style={tw`border-b border-gray-300 pb-2 focus:border-amber-500`}
                placeholderTextColor="#A1A1A1"
                secureTextEntry={!visibility}
                value={password}
                onChangeText={setPassword}
              />
              {visibility ? (
                <EyeIcon
                  style={tw`text-amber-500 absolute right-5`}
                  onPress={() => setVisibility((visibility) => !visibility)}
                />
              ) : (
                <EyeSlashIcon
                  style={tw`text-amber-500 absolute right-5`}
                  onPress={() => setVisibility((visibility) => !visibility)}
                />
              )}
            </View>
          </View>
          <Text
            style={tw`text-xs text-amber-500 mb-1 text-[13px] mb-5 font-semibold`}
          >
            {" "}
            Forgot password ?
          </Text>

          <CustomButton
            text="Sign Up"
            onPress={handleSubmit}
            backgroundStyles="bg-amber-500 py-3 rounded-full"
            textStyles="text-center text-white font-bold"
          />
          <View style={tw`mt-5`}>
            <Text style={tw`text-gray-700 text-[13px]`}>
              Already have an account?{" "}
              <Text
                style={tw`text-amber-500 font-semibold`}
                onPress={() => router.push("./signin")}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
