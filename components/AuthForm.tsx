import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ActivityIndicator } from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/solid";
import tw from "twrnc";
import CustomButton from "./CustomButton";
import Error from "./Error";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

interface AuthErrors {
  email?: string;
  password?: string;
  internal?: string;
}

interface AuthProps {
  title: string;
  type: string;
  loadingState?: boolean;
  onSubmit: (email: string, password: string, clear: () => void) => void;
  errors?: AuthErrors;
  onForgotPassword?: () => void;
}

export default function AuthForm({
  title,
  type,
  onForgotPassword,
  onSubmit,
  errors,
  loadingState,
}: AuthProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [error, setError] = useState<AuthErrors>({
    email: errors?.email,
    password: errors?.password,
    internal: errors?.internal,
  });
  const [passFocus, setPassFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const router = useRouter();
  const clear = () => {
    setEmail("");
    setPassword("");
    setEmailFocus(false);
    setPassFocus(false);
    setError({});
  };

  const handleSubmit = () => {
    if (email && password && password.length >= 5) {
      onSubmit(email, password, clear);
    } else {
      if (!email) setError((prev) => ({ ...prev, email: "Email is required" }));
      if (!password)
        setError((prev) => ({ ...prev, password: "Password is required" }));
      if (password.length < 5)
        setError((prev) => ({
          ...prev,
          password: "Please choose a longer password.",
        }));
    }
  };

  useEffect(
    function () {
      console.log(errors);
      setError(errors ? errors : {});
    },
    [errors]
  );

  return (
    <Animated.View
      entering={FadeInDown.duration(1000)}
      style={[
        tw`p-8 mt-[-2rem] bg-white rounded-tr-[40px] rounded-tl-[50px] h-full shadow-custom`,
        { boxShadow: "0px -40px 100px rgba(0, 0, 0, 0.387)" },
      ]}
    >
      <Text
        style={[
          tw`text-2xl font-bold text-amber-500 mb-10`,
          { fontFamily: "Poppins-Bold" },
        ]}
      >
        {title}
      </Text>
      <View style={tw`mb-6`}>
        <Text
          style={tw`${"text-sm text-gray-500 mb-1 text-[12px] opacity-30 font-bold transition duration-1500 font-pextrabold"} ${
            emailFocus || email ? "text-amber-500 opacity-100" : ""
          } ${error?.email ? "text-red-500" : ""}`}
        >
          EMAIL ADDRESS
        </Text>
        <TextInput
          style={tw`border-b border-gray-300 pb-2 transition duration-1500 ${
            emailFocus || email ? "border-amber-500" : ""
          } ${error?.email ? "border-red-500" : ""} `}
          placeholderTextColor="#A1A1A1"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          onChange={() => setError((prev) => ({ ...prev, email: "" }))}
        />
      </View>
      {error.email ? (
        <Error text={error.email} styles="mt-[-1rem] mb-4" />
      ) : null}

      <View style={tw`mb-6`}>
        <Text
          style={tw`text-sm text-gray-500 mb-1 text-[12px] opacity-30 font-bold transition duration-500 ${
            passFocus || password ? "text-amber-500 opacity-100" : ""
          } ${error?.password ? "text-red-500" : ""}`}
        >
          PASSWORD
        </Text>
        <View style={tw`relative`}>
          <TextInput
            style={tw`border-b border-gray-300 pb-2 transition duration-500  ${
              passFocus || password ? "border-amber-500" : ""
            } ${error?.password ? "border-red-500" : ""}`}
            placeholderTextColor="#A1A1A1"
            secureTextEntry={!visibility}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPassFocus(true)}
            onBlur={() => setPassFocus(false)}
            onChange={() => setError((prev) => ({ ...prev, password: "" }))}
          />
          {visibility ? (
            <EyeIcon
              style={tw`text-amber-500 absolute right-5 text-sm`}
              onPress={() => setVisibility((prev) => !prev)}
              size={20}
            />
          ) : (
            <EyeSlashIcon
              style={tw`text-amber-500 absolute right-5`}
              size={20}
              onPress={() => setVisibility((prev) => !prev)}
            />
          )}
        </View>
        {error.password ? <Error text={error.password} /> : null}
      </View>
      {type === "signin" && (
        <View>
          <Text
            style={tw`text-xs text-amber-500 mb-1 text-[13px] mb-5 font-semibold`}
            onPress={onForgotPassword}
          >
            Forgot password ?
          </Text>
        </View>
      )}

      <CustomButton
        {...(loadingState
          ? {
              icon: (
                <ActivityIndicator
                  size={3}
                  style={tw`${"text-white p-top-2"}`}
                />
              ),
            }
          : {})}
        text={loadingState ? "" : type === "signup" ? "Sign Up" : "Sign In"}
        onPress={handleSubmit}
        backgroundStyles="bg-amber-500 py-3 rounded-full"
        textStyles="text-center text-white font-bold"
        tapOpacity={0.9}
      />

      <View style={tw`mt-5`}>
        <Text style={tw`text-gray-700 text-[13px]`}>
          {type === "signup"
            ? "Already have an account ?"
            : "Don't have an account ?"}{" "}
          <Text
            style={tw`text-amber-500 font-semibold`}
            onPress={() =>
              router.push(`./${type === "signup" ? "signin" : "signup"}`)
            }
          >
            {type === "signup" ? "Sign In" : "Sign Up"}
          </Text>
        </Text>
      </View>
    </Animated.View>
  );
}
