import { View, Text, Image, FlatList, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import images from "../../constants/images";
import MenuIcon from "@/components/MenuIcon";
import SearchBar from "@/components/SearchBar";
import { HeartIcon, StarIcon } from "react-native-heroicons/solid";

export default function favorites() {
  const imageKeys = Object.keys(images);
  const favorites = imageKeys
    .map((key) => {
      const src = imageKeys[key] === "avatar" ? null : images[key];
      return {
        title: key,
        id: `recipe-${key}`,
        src,
        publisher: "meal Db",
      };
    })
    .filter((el) => el);
  console.log(favorites);
  return (
    <SafeAreaView>
      {/* header */}
      <View style={tw`px-4 flex flex-row  justify-between items-center`}>
        <CustomButton icon={<MenuIcon />} />
        <Text style={tw`font-bold text-2xl text-amber-500`}>Epicure</Text>
        <Link href={"./profile"}>
          <Image source={images.avatar} style={tw`w-10 h-10`} />
        </Link>
      </View>
      <View style={tw`px-4`}>
        <Text
          style={[
            tw`font-semibold text-2xl text-amber-500 my-5`,
            { fontFamily: "Diphylleia-Regular" },
          ]}
        >
          Favourites
        </Text>
        {/* search bar */}
        <SearchBar
          onSearch={() => console.log("object")}
          placeholder={"Search your favorites"}
        />
      </View>
      {/* list of favorites */}
      <FlatList
        data={favorites}
        renderItem={({ item, index }) => (
          <FavouriteItem
            title={item.title}
            src={item.src}
            id={item.id}
            // api={item.api}
            key={item.title}
            publisher={item.publisher}
          />
        )}
        keyExtractor={(item, index) => item.id + index}
        // numColumns={2}
        contentContainerStyle={tw`p-4`}
        ListFooterComponent={<View style={{ height: 150 }} />}
      />
    </SafeAreaView>
  );
}
type FavoriteItemProps = {
  title: string;
  src: any;
  id: string;
  api?: string;
  publisher: string;
};

const FavouriteItem = ({
  title,
  src,
  id,
  // api,
  publisher,
}: FavoriteItemProps) => {
  return (
    <Pressable style={tw`flex-row px-4 mb-3 items-center gap-4 `}>
      <View>
        <Image source={src} style={tw`rounded-[1.5rem] w-25 h-20`} />
      </View>
      <View>
        <Text
          style={[
            tw`font-semibold text-2xl text-black`,
            { fontFamily: "Diphylleia-Regular" },
          ]}
        >
          {title}
        </Text>
        <Text style={tw`text-black/30 text-[12px]`}>{publisher}</Text>
        <Text
          style={tw`text-right items-center justify-center flex-row gap-4 pt-2`}
        >
          <Text>
            {/* <HeartIcon size={16} style={tw`text-amber-500`} /> */}
            <StarIcon size={16} />
          </Text>
          <Text style={tw`mt-rem]`}>4.5</Text>
        </Text>
      </View>
    </Pressable>
  );
};
