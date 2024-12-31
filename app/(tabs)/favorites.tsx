import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Scrollable from "@/components/Scrollable";
import tw from "twrnc";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import images from "../../constants/images";

export default function favorites() {
  return (
    <SafeAreaView>
      <Scrollable>
        {/* header */}
        <View style={tw`px-4 flex flex-row  justify-between items-center`}>
          <CustomButton icon={<MenuIcon />} />
          <Text style={tw`font-bold text-2xl text-amber-500`}>Recipes</Text>
          <Link href={"./profile"}>
            <Image source={images.avatar} style={tw`w-10 h-10`} />
          </Link>
        </View>
      </Scrollable>
    </SafeAreaView>
  );
}

const MenuIcon = () => {
  return (
    <View style={tw`flex flex-col justify-center w-5 h-10 `} aria-label="Menu">
      <View style={tw`w-2 h-0.5 bg-black rounded-full mb-1`}></View>
      <View style={tw`w-4 h-0.5 bg-black rounded-full mb-1`}></View>
      <View style={tw`w-3 h-0.5 bg-black rounded-full self-end`}></View>
    </View>
  );
};
