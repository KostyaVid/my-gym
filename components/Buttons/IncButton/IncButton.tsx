import {
  GestureResponderEvent,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import React from "react";
import P from "../../P/P";
import { useTheme } from "@react-navigation/native";
import { observer } from "mobx-react-lite";

type IncButtonProps = {
  type: "increment" | "decrement";
  onPress?: (event: GestureResponderEvent) => void;
};

const IncButton: React.FC<IncButtonProps> = observer(({ type, onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableHighlight
      style={[styles.button, { backgroundColor: colors.primary }]}
      onPress={onPress}
    >
      <P style={styles.icon}>{type === "increment" ? "+" : "-"}</P>
    </TouchableHighlight>
  );
});

export default IncButton;

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
    color: "#fff",
  },
});
