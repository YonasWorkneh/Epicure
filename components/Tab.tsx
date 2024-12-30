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
      style={tw`items-center justify-center w-15 h-15 rounded-full mt-8 ${
        focused ? "bg-white/90" : ""
      }`}
    >
      {icon}
    </View>
  );
};

export default TabItem;
