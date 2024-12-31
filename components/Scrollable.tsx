import React, { ReactNode, useState } from "react";
import { Dimensions, ScrollView, ScrollViewProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";

interface ScrollableProps extends ScrollViewProps {
  children: ReactNode;
}

const Scrollable: React.FC<ScrollableProps> = ({ children, ...rest }) => {
  const [scrollY, setScrollY] = useState(0);
  const [contentHeight] = useState(0);
  const viewportHeight = Dimensions.get("window").height;
  const showBottomGradient = scrollY + viewportHeight < contentHeight;

  const handleScroll = (event: any) => {
    // alert("event fired");
    // alert(event.nativeEvent.contentOffset.y);
    setScrollY(event.nativeEvent.contentOffset.y);
  };
  return (
    <ScrollView {...rest} onScroll={handleScroll} style={tw`h-full`}>
      {scrollY < 0 && (
        <LinearGradient
          colors={["#f59f0b3d", "transparent"]}
          style={tw`absolute top-0 left-0 right-0 h-60 transition `}
        />
      )}
      {children}
      {showBottomGradient && (
        <LinearGradient
          colors={["transparent", "#f59f0b3d"]}
          style={tw`absolute bottom-0 left-0 right-0 h-20`}
        />
      )}
    </ScrollView>
  );
};

export default Scrollable;
