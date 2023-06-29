import { Button, GestureResponderEvent } from "react-native";
import React from "react";
import { observer } from "mobx-react-lite";
import { useTheme } from "@react-navigation/native";

type BasicButtonProps = {
  title: string;
  variant?: "primary" | "danger";
  onPress?: (event: GestureResponderEvent) => void;
};

const BasicButton: React.FC<BasicButtonProps> = observer(
  ({ title, variant = "primary", onPress }) => {
    const { colors } = useTheme();
    return (
      <Button
        title={title}
        onPress={onPress}
        color={variant === "primary" ? colors.primary : colors.notification}
      />
    );
  }
);

export default BasicButton;
