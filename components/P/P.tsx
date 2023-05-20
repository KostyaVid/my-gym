import { StyleSheet, Text, TextStyle } from "react-native";
import React, { ReactNode } from "react";
import { useTheme } from "@react-navigation/native";
import { StyleProp } from "react-native";

type PProps = {
  children: ReactNode;
  disable?: boolean;
};

const P: React.FC<PProps> = ({ children, disable }) => {
  const { colors } = useTheme();
  const style = StyleSheet.create({
    p: {
      color: colors.text,
    },
    disable: {
      opacity: 0.6,
    },
  });

  const styles: StyleProp<TextStyle> = [style.p];
  if (disable) styles.push(style.disable);

  return <Text style={styles}>{children}</Text>;
};

export default P;
