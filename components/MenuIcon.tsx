import { useTabContext } from "@/contexts/TabContext";
import { TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function MenuIcon() {
  const { setMenuOpened } = useTabContext();

  return (
    <TouchableOpacity
      style={tw`flex-1 flex-col justify-center w-5 h-10 `}
      aria-label="Menu"
      onPress={() => {
        setMenuOpened(true);
      }}
    >
      <View style={tw`w-2 h-0.5 bg-black rounded-full mb-1`}></View>
      <View style={tw`w-4 h-0.5 bg-black rounded-full mb-1`}></View>
      <View style={tw`w-3 h-0.5 bg-black rounded-full self-end`}></View>
    </TouchableOpacity>
  );
}
