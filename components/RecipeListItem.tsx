import { Image, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import tw from "twrnc";

type RecipeItemProps = {
  title: string;
  src: any;
  index: number;
  id: string;
};

export default function RecipeListItem({ title, src, index }: RecipeItemProps) {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      style={tw`flex-1 m-2`}
    >
      <View>
        <Image
          source={src}
          style={[
            tw`w-full rounded-[40px]`,
            {
              height: index % 3 === 0 ? hp(25) : hp(30),
              marginTop: index % 3 === 0 ? "-1rem" : "initial",
            },
          ]}
        />
      </View>
      <Text
        style={[
          tw`px-3 py-2 text-[1rem]`,
          { fontFamily: "Diphylleia-Regular" },
        ]}
      >
        {title.length > 20 ? title.slice(0, 20) + "..." : title}
      </Text>
    </Animated.View>
  );
}
