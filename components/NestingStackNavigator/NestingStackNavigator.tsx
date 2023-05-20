import React, { ReactNode } from "react";
import { useTheme } from "@react-navigation/native";

type NestingStackNavigatorProps = {
  children: ReactNode;
  Stack: any;
};

const NestingStackNavigator = ({
  children,
  Stack,
}: NestingStackNavigatorProps) => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: colors.background } }}
    >
      {children}
    </Stack.Navigator>
  );
};

export default NestingStackNavigator;
