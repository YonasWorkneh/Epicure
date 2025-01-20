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
  CameraIcon,
} from "react-native-heroicons/solid";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useTabContext } from "@/contexts/TabContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchUser, updateUser } from "@/lib/api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [image, setImage] = useState<any>();
  const [updating, setUpdating] = useState(false);

  const [profileUri, setProfileUri] = useState("");
  const { setShowTabBar } = useTabContext();
  const [clear, setClear] = useState(false);

  const openGallery = async () => {
    // Request permission to access the media library
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need media library permissions to make this work!");
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
    await AsyncStorage.removeItem("userId");
    setClear(true);
    router.navigate(`/(tabs)/home?clear=${true}`);
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
    } catch (error: any) {
      // Handle error
      console.error("Failed to update profile:", error.message);
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
          const user = await fetchUser();
          const { name, email, image } = user;
          setName(name);
          setEmail(email);
          setProfileUri(image); //profile uri from supabase storage
        } catch (err: any) {
          // setClear(true);
        }
      };
      getUser();
    },
    [clear]
  );

  return (
    <SafeAreaView key={`${clear}`}>
      <ScrollView>
        {/* header */}
        <View style={tw`flex-row items-center justify-between p-2`}>
          <View style={tw`flex-row  gap-5`}>
            <CustomButton
              icon={<ArrowLeftIcon style={tw`text-black`} />}
              onPress={() => {
                setShowTabBar(true);
                router.back();
              }}
            />
            <Text style={tw`font-bold text-xl text-amber-500`}>Profile</Text>
          </View>
          <CustomButton
            icon={
              <View style={tw`flex-row items-center gap-2 py-2`}>
                <ArrowLeftStartOnRectangleIcon style={tw`text-amber-500`} />
                <Text style={tw`text-amber-500 font-bold`}>Log out</Text>
              </View>
            }
            onPress={onLogOut}
          />
        </View>
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
                <CameraIcon style={tw`absolute bottom-3 right-2 text-black `} />
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
                tw`bg-white rounded-full p-3 px-4 m-2 mx-0`,
                { boxShadow: "0px 0px 10px #807a7a28" },
              ]}
              value={name}
              onChangeText={setName}
            />
          </View>
          <View>
            <Text style={tw`font-bold text-amber-500`}>Email</Text>
            <TextInput
              style={[
                tw`bg-white rounded-full p-3 px-4 m-2 mx-0`,
                { boxShadow: "0px 0px 10px #807a7a28" },
              ]}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View>
            <Text style={tw`font-bold text-amber-500`}>Current Password</Text>
            <TextInput
              style={[
                tw`bg-white rounded-full p-3 px-4 m-2 mx-0`,
                { boxShadow: "0px 0px 10px #807a7a28" },
              ]}
              value={currPass}
              onChangeText={setCurrPass}
            />
          </View>
          <View>
            <Text style={tw`font-bold text-amber-500`}>New Password</Text>
            <TextInput
              style={[
                tw`bg-white rounded-full p-3 px-4 m-2 mx-0`,
                { boxShadow: "0px 0px 10px #807a7a28" },
              ]}
              value={newPass}
              onChangeText={setNewPass}
            />
          </View>
          {/* apply-button */}
          <View style={tw`p-2 flex-row justify-center items-center`}>
            <CustomButton
              icon={
                updating ? (
                  <ActivityIndicator
                    size={3}
                    style={tw`${"text-white p-top-2"}`}
                  />
                ) : (
                  ""
                )
              }
              text={updating ? "" : "Save Changes"}
              backgroundStyles="bg-amber-500 rounded-full p-3  w-full m-6 shadow-lg"
              textStyles="text-center text-white font-bold"
              onPress={() => handleUpdate()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
