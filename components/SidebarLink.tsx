import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";

type SidebarLinkProps = {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
};
export default function SidebarLink({
  title,
  icon,
  isActive,
}: SidebarLinkProps) {
  return (
    <TouchableOpacity
      style={tw`flex flex-row items-center gap-3 mb-4 p-2 rounded-lg ${
        isActive ? "bg-white/20" : ""
      }`}
    >
      {icon}
      <Text style={[tw`text-sm `, { fontFamily: "Poppins-SemiBold" }]}>
        {title
          .split(" ")
          .map((el) => el[0].toUpperCase() + el.slice(1))
          .join(" ")}
      </Text>
    </TouchableOpacity>
  );
}
