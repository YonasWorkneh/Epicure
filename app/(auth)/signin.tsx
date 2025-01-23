import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import tw from "twrnc";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInRight } from "react-native-reanimated";

import images from "@/constants/images";
import { signIn } from "@/lib/api/user";
import CustomButton from "@/components/CustomButton";
import AuthForm from "@/components/AuthForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { useTabContext } from "@/contexts/TabContext";

interface SignUpErrors {
  email?: string;
  password?: string;
}

export default function signup() {
  const { rerender } = useLocalSearchParams();
  const [renderKey, setRenderKey] = useState(rerender);
  const [signingIn, setSigningIn] = useState(false);
  const router = useRouter();
  const [signInErrors, setSignUpErrors] = useState<SignUpErrors>({});
  const { setShowTabBar } = useTabContext();
  const handleSignIn = async (
    email: string,
    password: string,
    clear: () => void
  ) => {
    try {
      setSigningIn(true);
      const res = await signIn(email, password);
      await AsyncStorage.setItem("userId", JSON.stringify(res.id));
      clear();
      setShowTabBar(true);
      router.replace("/(tabs)/home");
    } catch (err: any) {
      const errMessage = JSON.parse(err.message);
      setSignUpErrors(errMessage);
    } finally {
      setTimeout(() => setSigningIn(false), 1000);
    }
  };
  useEffect(
    function () {
      setRenderKey(rerender);
    },
    [rerender]
  );

  return (
    <SafeAreaView
      style={tw`h-full bg-white`}
      key={Array.isArray(renderKey) ? renderKey[0] : renderKey}
    >
      <ScrollView>
        <CustomButton
          text="Skip"
          onPress={() => {
            setShowTabBar(true);
            router.push("/(tabs)/home");
          }}
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
          title="Sing In"
          type="signin"
          onSubmit={handleSignIn}
          errors={signInErrors}
          loadingState={signingIn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
