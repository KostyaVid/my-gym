import { StyleProp, View, ViewStyle } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const HR = () => {
  const { colors } = useTheme();
  const style: StyleProp<ViewStyle> = {
    width: "100%",
    height: 1,
    marginVertical: 10,
    backgroundColor: colors.border,
  };

  return <View style={style}></View>;
};

export default HR;
