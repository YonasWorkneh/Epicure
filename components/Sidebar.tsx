import images from "@/constants/images";
import { Link, useRouter } from "expo-router";
import React from "react";
import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";
import {
  ClipboardDocumentIcon,
  EnvelopeIcon,
  HeartIcon,
  HomeIcon,
  ShareIcon,
  ShoppingCartIcon,
  StarIcon,
  UserIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import Animated, { FadeInLeft } from "react-native-reanimated";
import tw from "twrnc";
import SidebarLink from "./SidebarLink";
import CustomButton from "./CustomButton";
import { useTabContext } from "@/contexts/TabContext";

const Sidebar = () => {
  const { setMenuOpened } = useTabContext();
  const router = useRouter();

  return (
    <Animated.View
      entering={FadeInLeft.duration(500)}
      style={[tw`bg-amber-500 flex-1 h-full w-70 absolute z-1000`]}
    >
      <View
        style={tw`top-8 left-4 absolute z-10000 flex-1 items-center justify-center`}
      >
        <CustomButton
          icon={<XMarkIcon style={tw`text-black `} size={22} />}
          backgroundStyles="bg-amber-500/20 flex-1 items-center justify-center"
          onPress={() => setMenuOpened(false)}
        />
      </View>
      <View style={[tw`items-center  p-5 pt-12  px-6`]}>
        <Image source={images.foodsvg} style={tw`h-25 w-25 items-center`} />
        <Text style={[tw`font-bold text-xl`, { fontFamily: "Poppins-Bold" }]}>
          Epicure
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`mt-10 px-6`}>
          <SidebarLink
            title="home"
            icon={<HomeIcon style={tw`text-black`} size={20} />}
            isActive={true}
          />
          <SidebarLink
            title="favorite recipes"
            icon={<HeartIcon style={tw`text-black`} size={20} />}
          />
          <SidebarLink
            title="profile"
            icon={<UserIcon style={tw`text-black`} size={20} />}
          />
          <SidebarLink
            title="shopping list"
            icon={<ShoppingCartIcon style={tw`text-black`} size={20} />}
          />
        </View>
        <View style={tw`mt-10 border-t border-gray-900/20 p-8 px-6`}>
          <Text style={[tw`text-xl mb-8`, { fontFamily: "Poppins-Bold" }]}>
            Support Us
          </Text>
          <SidebarLink
            title="contact us"
            icon={<EnvelopeIcon style={tw`text-black`} size={20} />}
          />
          <SidebarLink
            title="rate us"
            icon={<StarIcon style={tw`text-black`} size={20} />}
          />
          <SidebarLink
            title="share app"
            icon={<ShareIcon style={tw`text-black`} size={20} />}
          />
          <SidebarLink
            title="privacy policy"
            icon={<ClipboardDocumentIcon style={tw`text-black`} size={20} />}
          />
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default Sidebar;
