import { DefaultTheme } from "@react-navigation/native";
import type { Theme } from "@react-navigation/native";

export const GymDefaultTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(120,120,120)",
    card: "rgb(245, 245, 245)",
    background: "#ffffff",
    notification: "rgb(150, 69, 58)",
  },
};
export const GymDarkTheme: Theme = {
  dark: false,
  colors: {
    primary: "rgb(60, 60, 60)",
    background: "rgb(0, 0, 0)",
    card: "rgb(20, 20, 20)",
    text: "rgb(255, 255, 255)",
    border: "rgb(100, 100, 100)",
    notification: "rgb(150, 69, 58)",
  },
};
