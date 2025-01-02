import { TouchableOpacity, View, Text, Image } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import tw from "twrnc";

type CategoryItemProps = {
  name: string;
  src: string;
  id: string;
  index: number;
  onSetCategory: (category: string) => void;
};

export default function CategoryItem({
  index,
  onSetCategory,
  name,
  src,
}: CategoryItemProps) {
  return (
    <TouchableOpacity
      key={index}
      activeOpacity={0.8}
      onPress={() => onSetCategory(name)}
    >
      <Animated.View
        style={tw`items-center `}
        entering={FadeInDown.delay(index * 100).duration(500)}
      >
        <View style={tw`relative h-10 w-10 bg-amber-500/80 rounded-full`}>
          <Image
            source={src}
            style={tw`h-10 w-10 rounded-full bg-amber-500/10 absolute top-0 left-0 opacity-50`}
          />
        </View>
        <Text
          style={[
            tw`text-gray-500 text-[11px]`,
            { fontFamily: "Diphylleia-Regular" },
          ]}
        >
          {name}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}
