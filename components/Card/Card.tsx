import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { observer } from "mobx-react-lite";
import { useTheme } from "@react-navigation/native";

type CardProps = { children: React.ReactNode };

const Card: React.FC<CardProps> = observer(({ children }) => {
  const { colors } = useTheme();
  const style: StyleProp<ViewStyle> = [
    styles.container,
    { backgroundColor: colors.card, shadowColor: colors.text },
  ];
  return <View style={style}>{children}</View>;
});

export default Card;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
