import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, StyleProp, TextStyle } from "react-native";
import { Text } from "react-native-paper";

type Props = {
  value: number;
};

const DiffAbove: React.FC<Props> = observer(({ value }) => {
  const isNegative = value < 0;
  const styleText: StyleProp<TextStyle> = [style.label];
  if (isNegative) {
    styleText.push(style.negative);
  }
  if (value > 0) {
    styleText.push(style.positive);
  }
  if (value === 0) {
    styleText.push(style.zero);
  }
  return (
    <Text variant="labelSmall" style={styleText}>
      {(isNegative ? "" : "+") + value}
    </Text>
  );
});

export default DiffAbove;
const style = StyleSheet.create({
  label: {
    alignSelf: "flex-start",
  },
  negative: {
    color: "rgb(186, 26, 26)",
  },
  positive: {
    color: "rgb(26,186,26)",
  },
  zero: {
    opacity: 0.4,
  },
});
