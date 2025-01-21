import React, { useRef, useState } from "react";
import {
  View,
  Pressable,
  Image,
  Text,
  Share,
  TouchableOpacity,
} from "react-native";
import {
  StarIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ShareIcon,
  EllipsisVerticalIcon,
} from "react-native-heroicons/solid";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
import tw from "twrnc";
import { removeBookmarked } from "@/lib/api/recipe";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

type FavoriteItemProps = {
  title?: string;
  src?: any;
  id?: string;
  api?: string;
  publisher?: string;
  duration?: number;
  removeHandler: (recipe: any) => void;
};

const FavouriteItem = ({
  title,
  src,
  id,
  api,
  publisher,
  duration,
  removeHandler,
}: FavoriteItemProps) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const handleRemove = async (id: string) => {
    try {
      await removeBookmarked(id);
      removeHandler((prevRecipes: any) =>
        prevRecipes.filter((recipe: any) => recipe.id !== id)
      );
    } catch (error) {
      console.log("Error removing bookmarked recipe:", error);
    }
  };
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: "Check out Epicure recipe app: exp://192.168.1.3:8081",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    // wrapper

    <Animated.View
      entering={FadeInDown.duration(duration || 500)}
      style={tw`${"flex-row justify-between items-center"}`}
      key={id}
    >
      <View style={tw`${"flex-row px-2 mb-3 items-center gap-4"}`}>
        <View>
          <Image
            source={{ uri: src }}
            style={tw`rounded-[1.5rem] w-25 h-20 bg-amber-500/50`}
          />
        </View>
        <View>
          <Text
            style={[
              tw`font-semibold text-xl text-black`,
              { fontFamily: "Diphylleia-Regular" },
            ]}
          >
            {title}
          </Text>
          <Text style={tw`text-black/30 text-[12px]`}>{publisher}</Text>
          <Text
            style={tw`text-right  flex-row gap-8 pt-2 items-center justify-center text-center`}
          >
            <StarIcon size={16} style={tw`text-amber-500 text-center`} />
            <Text style={tw`mt-[-1rem] text-center`}>
              {(Math.random() * (4 - 3 + 1) + 3).toFixed(1)}
            </Text>
          </Text>
        </View>
      </View>
      {/* action button with dropdown menu */}
      <View style={tw`${"relative"}`}>
        <CustomButton
          icon={
            <EllipsisVerticalIcon size={20} style={tw`${"text-gray-700"}`} />
          }
          onPress={() => setShowDropDown((state) => !state)}
        />
        {showDropDown && (
          <View
            style={tw`${"absolute z-auto bottom-[-6.5rem] right-2 bg-white border border-gray-300 w-35 rounded-lg"}`}
          >
            <TouchableOpacity
              style={tw`${"flex-row gap-2 mb-2 border-b border-gray-200 p-2"}`}
              onPress={() => {
                router.navigate(`/(tabs)/recipe?id=${id}&api=${api}`);
                setShowDropDown(false);
              }}
              activeOpacity={0.7}
            >
              <MagnifyingGlassIcon size={15} style={tw`${"text-amber-500"}`} />
              <Text style={tw`${"text-xs"}`}>View detail</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`${"flex-row gap-2 mb-2  border-b border-gray-200 p-2"}`}
              onPress={() => {
                setShowDropDown(false);
                handleShare();
              }}
              // activeOpacity={70}
            >
              <ShareIcon size={15} style={tw`${"text-amber-500"}`} />
              <Text style={tw`${"text-xs"}`}>Share recipe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`${"flex-row gap-2 mb-2 p-2"}`}
              onPress={() => handleRemove(id ? id : "")}
              activeOpacity={0.7}
            >
              <TrashIcon size={15} style={tw`${"text-amber-500"}`} />
              <Text style={tw`${"text-xs"}`}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

export default FavouriteItem;
