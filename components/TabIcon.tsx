import { Text, View } from "react-native";
import { HomeIcon } from "react-native-heroicons/solid";
import tw from "twrnc";

type AuthProps = {
  title: string;
  focused: boolean;
  icon: React.ReactNode;
};

const TabItem = ({ focused, icon }: AuthProps) => {
  return (
    <View
      style={tw`items-center bg-none justify-center w-10 h-10 rounded-full mt-3 transition-bg duration-500 ${
        focused ? "bg-white/90" : ""
      }`}
    >
      {icon}
    </View>
  );
};

export default TabItem;
