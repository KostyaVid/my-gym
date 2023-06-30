import { StyleSheet, Text, TextStyle } from "react-native";
import React, { ReactNode } from "react";
import { useTheme } from "@react-navigation/native";
import { StyleProp } from "react-native";

type sizeP = "h1" | "h2" | "h3" | "p";

type PProps = {
  children: ReactNode;
  disable?: boolean;
  style?: StyleProp<TextStyle>;
  size?: sizeP;
};

const parseSize = (size: sizeP) => {
  switch (size) {
    case "p":
      return 14;
    case "h1":
      return 26;
    case "h2":
      return 20;
    case "h3":
      return 16;
  }
};

const P: React.FC<PProps> = ({ children, disable, style, size = "p" }) => {
  const { colors } = useTheme();

  const styles: StyleProp<TextStyle> = [
    {
      color: colors.text,
      fontSize: parseSize(size),
      flexGrow: 0,
      flexShrink: 1,
    },
  ];
  if (disable) styles.push(styleCommon.disable);
  if (style) styles.push(style);

  return <Text style={styles}>{children}</Text>;
};

export default P;
const styleCommon = StyleSheet.create({
  disable: {
    opacity: 0.6,
  },
});
