import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Scrollable from "@/components/Scrollable";
import tw from "twrnc";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import images from "../../constants/images";
import MenuIcon from "@/components/MenuIcon";

export default function favorites() {
  return (
    <SafeAreaView>
      <Scrollable>
        {/* header */}
        <View style={tw`px-4 flex flex-row  justify-between items-center`}>
          <CustomButton icon={<MenuIcon />} />
          <Text style={tw`font-bold text-2xl text-amber-500`}>Epicure</Text>
          <Link href={"./profile"}>
            <Image source={images.avatar} style={tw`w-10 h-10`} />
          </Link>
        </View>
      </Scrollable>
    </SafeAreaView>
  );
}

