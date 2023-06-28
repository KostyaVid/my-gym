import { StyleSheet, Text, TextStyle } from "react-native";
import React, { ReactNode } from "react";
import { useTheme } from "@react-navigation/native";
import { StyleProp } from "react-native";

type PProps = {
  children: ReactNode;
  disable?: boolean;
  style?: StyleProp<TextStyle>;
};

const P: React.FC<PProps> = ({ children, disable, style }) => {
  const { colors } = useTheme();
  const styleCommon = StyleSheet.create({
    p: {
      color: colors.text,
    },
    disable: {
      opacity: 0.6,
    },
  });

  const styles: StyleProp<TextStyle> = [styleCommon.p];
  if (disable) styles.push(styleCommon.disable);
  if (style) styles.push(style);

  return <Text style={styles}>{children}</Text>;
};

export default P;
