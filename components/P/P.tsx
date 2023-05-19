import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { useTheme } from "@react-navigation/native";

type PProps = {
  children: ReactNode;
};

const P: React.FC<PProps> = ({ children }) => {
  const { colors } = useTheme();

  return <Text style={{ color: colors.text }}>{children}</Text>;
};

export default P;
