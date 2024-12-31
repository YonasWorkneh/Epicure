import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { MagnifyingGlassCircleIcon } from "react-native-heroicons/solid";

import tw from "twrnc";

type SearchProps = {
  onSearch: () => void;
  backgroundStyles?: string;
  inputStyles?: string;
};

const SearchBar: React.FC<SearchProps> = ({
  onSearch,
  backgroundStyles,
  inputStyles,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      style={tw`flex flex-row items-center border border-gray-300 bg-amber-500/5 rounded-full px-3 py-2 border ${
        isFocused ? "border-gray-600" : ""
      } ${backgroundStyles ? backgroundStyles : ""}`}
    >
      <TextInput
        style={tw`flex-1 text-grey-700 ${inputStyles ? inputStyles : ""}`}
        placeholder="Search recipes"
        placeholderTextColor="rgba(0,0,0,0.5)"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <MagnifyingGlassCircleIcon fill={"rgb(245 158 11)"} size={30} />
    </View>
  );
};

export default SearchBar;
