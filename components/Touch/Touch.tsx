import {
  GestureResponderEvent,
  StyleProp,
  TouchableHighlight,
  ViewStyle,
} from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

type TouchProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

const Touch: React.FC<TouchProps> = ({ onPress, style, children }) => {
  const { colors } = useTheme();
  return (
    <TouchableHighlight
      style={style}
      onPress={onPress}
      activeOpacity={0.7}
      underlayColor={colors.primary}
    >
      {children}
    </TouchableHighlight>
  );
};

export default Touch;
