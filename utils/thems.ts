import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import type { Theme } from "@react-navigation/native";

export const GymDefaultTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(60,60,60)",
  },
};
export const GymDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "rgb(60,60,60)",
  },
};
