import { useTabContext } from "@/contexts/TabContext";
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { MagnifyingGlassCircleIcon } from "react-native-heroicons/solid";

import tw from "twrnc";

type SearchProps = {
  onSearch: (key: string, reset?: boolean) => void;
  backgroundStyles?: string;
  inputStyles?: string;
  placeholder?: string;
};

const SearchBar: React.FC<SearchProps> = ({
  onSearch,
  backgroundStyles,
  inputStyles,
  placeholder = "Search recipes",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [key, setKey] = useState("");
  const { setShowTabBar } = useTabContext();
  function handleSearch(key: string) {
    setKey(key);
    if (key.length < 3) onSearch("", true);
    onSearch(key);
  }
  return (
    <View
      style={tw`flex flex-row items-center border border-gray-300 bg-amber-500/5 rounded-full px-3 py-2 border ${
        isFocused ? "border-gray-600" : ""
      } ${backgroundStyles ? backgroundStyles : ""}`}
    >
      <TextInput
        style={tw`flex-1 text-grey-700 ${inputStyles ? inputStyles : ""}`}
        placeholder={placeholder}
        placeholderTextColor="rgba(0,0,0,0.5)"
        onFocus={() => {
          setIsFocused(true);
          setShowTabBar(false);
        }}
        onBlur={() => {
          setIsFocused(false);
          setShowTabBar(true);
        }}
        value={key}
        onChangeText={handleSearch}
      />
      <MagnifyingGlassCircleIcon
        fill={"rgb(245 158 11)"}
        size={30}
        onPress={() => onSearch(key)}
      />
    </View>
  );
};

export default SearchBar;
