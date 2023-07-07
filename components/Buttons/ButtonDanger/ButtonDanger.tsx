import React, { ReactNode } from "react";
import { GestureResponderEvent } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/src/components/Icon";
type Props = {
  mode?:
    | "text"
    | "outlined"
    | "contained"
    | "elevated"
    | "contained-tonal"
    | undefined;
  icon?: IconSource | undefined;
  children?: ReactNode;
  onPress?: ((e: GestureResponderEvent) => void) | undefined;
};
const ButtonDanger: React.FC<Props> = ({ children, mode, icon, onPress }) => {
  const { colors } = useTheme();
  return (
    <Button
      mode={mode}
      icon={icon}
      buttonColor={colors.error}
      textColor={colors.onError}
      onPress={onPress}
    >
      {children}
    </Button>
  );
};

export default ButtonDanger;
