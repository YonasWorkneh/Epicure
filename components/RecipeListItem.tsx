import { useTabContext } from "@/contexts/TabContext";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import tw from "twrnc";

type RecipeItemProps = {
  title: string;
  src: any;
  index: number;
  id: string;
  api: string;
};

export default function RecipeListItem({
  title,
  src,
  index,
  id,
  api,
}: RecipeItemProps) {
  const router = useRouter();
  const { setShowTabBar } = useTabContext();
  return (
    <Pressable
      onPress={() => {
        router.navigate(`/(tabs)/recipe?id=${id}&api=${api}`);
        setShowTabBar(false);
      }}
      style={tw`flex-1`}
    >
      <Animated.View
        entering={FadeInDown.delay(index * 100)}
        style={tw`flex-1 m-2`}
      >
        <View>
          <Animated.Image
            source={{ uri: src }}
            style={[
              tw`w-full rounded-[40px] bg-amber-500/50`,
              {
                height: index % 3 === 0 ? hp(25) : hp(30),
                marginTop: index % 3 === 0 ? "-1rem" : "initial",
              },
            ]}
            sharedTransitionTag={id}
          />
        </View>
        <Text
          style={[
            tw`px-3 py-2 text-[1rem]`,
            { fontFamily: "Diphylleia-Regular" },
          ]}
        >
          {title.length > 15 ? title.slice(0, 15) + "..." : title}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
