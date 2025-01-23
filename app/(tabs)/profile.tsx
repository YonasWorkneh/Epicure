import {
  View,
  Text,
  Image,
  TextInput,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";

import {
  ArrowLeftIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  CameraIcon,
  DocumentMagnifyingGlassIcon,
  EyeIcon,
  EyeSlashIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useTabContext } from "@/contexts/TabContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchUser, updateUser } from "@/lib/api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

export default function profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [image, setImage] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [currPassFocus, setCurrFocus] = useState(false);
  const [newPassFocus, setNewPassFocus] = useState(false);
  const [currPassVisibility, setCurrPassVisibility] = useState(false);
  const [newPassVisibility, setNewPassVisibility] = useState(false);
  const [profileUri, setProfileUri] = useState("");
  const { loggedOut, setLoggedOut, setShowTabBar, setActiveTab } =
    useTabContext();

  const openGallery = async () => {
    // Request permission to access the media library
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        showMessage({
          message:
            "Sorry, we need media library permissions to make this work!",
          type: "danger",
        });
        return;
      }
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only show images
      allowsEditing: true, // Allow users to edit the image
      quality: 1, // Full quality
    });

    if (!result.canceled) {
      // If the user picked an image, set it to state
      setProfileUri(result.assets[0].uri);
      setImage(result.assets[0]);
    }
  };

  const onLogOut = async () => {
    const id = await AsyncStorage.getItem("userId");
    if (!id) {
      router.replace("/(auth)/signup");
      return;
    }
    await AsyncStorage.removeItem("userId");
    setLoggedOut(true);
    setError("no user");
    setShowTabBar(true);
    router.replace(`/(tabs)/home?clear=${true}`);
  };

  const handleUpdate = async () => {
    try {
      // Call the updateUser API function here
      setUpdating(true);
      const updated: any = await updateUser({
        name,
        email,
        currPass,
        newPass,
        image,
      });
      // Handle successful update
      const { name: uName, email: uEmail, image: uImage } = updated;
      setName(uName);
      setEmail(uEmail);
      setProfileUri(uImage); //profile uri from supabase storage
      showMessage({
        message: "Profile updated succesfully!",
        animated: true,
        backgroundColor: "rgb(245 158 11)",
        color: "#fff",
        statusBarHeight: 45,
        duration: 2800,
      });
    } catch (error: any) {
      // Handle error
      showMessage({
        message: error.message,
        type: "danger",
      });
    } finally {
      setTimeout(() => {
        setUpdating(false);
      }, 1000);
    }
  };

  useEffect(function () {
    setShowTabBar(false);
  }, []);

  useEffect(
    function () {
      const getUser = async () => {
        try {
          setIsLoading(true);
          const id = await AsyncStorage.getItem("userId");
          if (!id) setError("no user found");
          const user = await fetchUser();
          const { name, email, image } = user;
          setName(name);
          setEmail(email);
          setProfileUri(image); //profile uri from supabase storage
        } catch (err: any) {
          showMessage({
            type: "danger",
            message: "Error trying to fetch your profile.",
          });
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      };
      getUser();
    },
    [loggedOut]
  );

  return (
    <SafeAreaView>
      <ScrollView>
        {/* header */}
        <View style={tw`flex-row items-center justify-between p-2`}>
          <View style={tw`flex-row  gap-5`}>
            <CustomButton
              icon={<ArrowLeftIcon style={tw`text-black`} />}
              onPress={() => {
                setShowTabBar(true);
                router.back();
                setActiveTab("home");
              }}
            />
            <Text style={tw`font-bold text-xl text-amber-500`}>Profile</Text>
          </View>
          <CustomButton
            icon={
              <View style={tw`flex-row items-center gap-2 py-2`}>
                {error ? (
                  <ArrowRightStartOnRectangleIcon
                    size={20}
                    style={tw`text-amber-500 text-xs`}
                  />
                ) : (
                  <ArrowLeftStartOnRectangleIcon
                    style={tw`text-amber-500 text-xs`}
                  />
                )}
                <Text style={tw`text-amber-500 text-xs`}>
                  {error ? "Sign up" : "Log out"}
                </Text>
              </View>
            }
            onPress={onLogOut}
          />
        </View>
        {/* main */}
        {isLoading ? (
          <ActivityIndicator
            size={"large"}
            style={tw`text-amber-500 items-center mt-75`}
          />
        ) : error ? (
          <View style={tw`items-center mt-20`}>
            <View style={tw`text-amber-500 mb-10`}>
              <DocumentMagnifyingGlassIcon
                style={tw`text-amber-500`}
                size={100}
              />
              <XMarkIcon
                style={tw`text-amber-500 absolute right-3 top-[-0.5rem] font-bold`}
                size={25}
              />
            </View>
            <Text style={tw`${"font-pbold text-gray-600 text-xl mb-5"}`}>
              User not found.
            </Text>
            <Text style={tw`${"text-xs text-gray-400 text-center mb-5"}`}>
              Looks like you are not logged in.{"\n"} Please sign up or sign in
              to acess your profile.
            </Text>
            <CustomButton
              backgroundStyles="bg-amber-500 py-2 rounded-[4rem] p-2 px-6"
              text="Create account"
              textStyles="text-white text-xs"
              onPress={() => router.replace("/(auth)/signup")}
            />
          </View>
        ) : (
          <View>
            {/* profile-image */}
            <View style={tw`flex items-center m-top-7 relative`}>
              <View style={tw`relative`}>
                <Image
                  source={
                    profileUri
                      ? { uri: profileUri } // If an image is selected, use its URI
                      : require("../../assets/images/avatar.png") // Fallback to default
                  }
                  style={tw`h-25 w-25 rounded-full`}
                />
                <CustomButton
                  icon={
                    <CameraIcon
                      style={tw`absolute bottom-3 right-2 text-black `}
                    />
                  }
                  onPress={openGallery}
                />
              </View>
            </View>
            {/* form */}
            <View style={tw`p-10 m-top-6`}>
              {/* inputs */}
              <View>
                <Text style={tw`font-bold text-amber-500`}>Full name</Text>
                <TextInput
                  style={[
                    tw`bg-white rounded-full p-3 px-4 m-2 mx-0 ${
                      name || nameFocus
                        ? "shadow-l shadow-amber-500 border border-amber-500"
                        : ""
                    }`,
                    { boxShadow: "0px 0px 10px #807a7a28" },
                  ]}
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setNameFocus(true)}
                  onBlur={() => setNameFocus(false)}
                />
              </View>
              <View>
                <Text style={tw`font-bold text-amber-500`}>Email</Text>
                <TextInput
                  style={[
                    tw`bg-white rounded-full p-3 px-4 m-2 mx-0 ${
                      email || emailFocus
                        ? "shadow-l shadow-amber-500 border border-amber-500"
                        : ""
                    }`,
                    { boxShadow: "0px 0px 10px #807a7a28" },
                  ]}
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
              </View>
              <View>
                <Text style={tw`font-bold text-amber-500`}>
                  Current Password
                </Text>
                <View style={tw`relative`}>
                  <TextInput
                    style={tw`bg-white rounded-full p-3 px-4 m-2 mx-0  ${
                      currPassFocus || currPass
                        ? "shadow-l border border-amber-500 shadow-amber-500"
                        : ""
                    }`}
                    secureTextEntry={!currPassVisibility}
                    value={currPass}
                    onChangeText={setCurrPass}
                    onFocus={() => setCurrFocus(true)}
                    onBlur={() => setCurrFocus(false)}
                    textContentType="none"
                    autoComplete="off"
                  />
                  {currPassVisibility ? (
                    <EyeIcon
                      style={tw`text-amber-500 absolute right-5 top-[1.2rem] text-sm`}
                      onPress={() => setCurrPassVisibility((prev) => !prev)}
                      size={20}
                    />
                  ) : (
                    <EyeSlashIcon
                      style={tw`text-amber-500 absolute right-5 top-[1.2rem]`}
                      size={20}
                      onPress={() => setCurrPassVisibility((prev) => !prev)}
                    />
                  )}
                </View>
              </View>
              <View>
                <Text style={tw`font-bold text-amber-500`}>New Password</Text>
                <View style={tw`relative`}>
                  <TextInput
                    style={tw`bg-white rounded-full p-3 px-4 m-2 mx-0  ${
                      newPassFocus || newPass
                        ? "shadow-l border border-amber-500 shadow-amber-500"
                        : ""
                    }`}
                    secureTextEntry={!newPassVisibility}
                    value={newPass}
                    onChangeText={setNewPass}
                    onFocus={() => setNewPassFocus(true)}
                    onBlur={() => setNewPassFocus(false)}
                    textContentType="none"
                    autoComplete="off"
                  />
                  {currPassVisibility ? (
                    <EyeIcon
                      style={tw`text-amber-500 absolute right-5 top-[1.2rem] text-sm`}
                      onPress={() => setNewPassVisibility((prev) => !prev)}
                      size={20}
                    />
                  ) : (
                    <EyeSlashIcon
                      style={tw`text-amber-500 absolute right-5 top-[1.2rem]`}
                      size={20}
                      onPress={() => setNewPassVisibility((prev) => !prev)}
                    />
                  )}
                </View>
              </View>
              {/* apply-button */}
              <View style={tw`p-2 flex-row justify-center items-center`}>
                <CustomButton
                  icon={
                    updating ? (
                      <ActivityIndicator
                        size={20}
                        style={tw`${"text-white"}`}
                      />
                    ) : (
                      ""
                    )
                  }
                  text={updating ? "" : "Save Changes"}
                  backgroundStyles="bg-amber-500 rounded-full py-3  w-full m-6 shadow-lg h-12 items-center justify-center"
                  textStyles={
                    updating ? "" : "text-center text-white font-bold"
                  }
                  onPress={() => handleUpdate()}
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
