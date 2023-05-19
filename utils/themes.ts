import { DefaultTheme } from "@react-navigation/native";
import type { Theme } from "@react-navigation/native";

export const GymDefaultTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(60,60,60)",
    background: "#ffffff",
  },
};
export const GymDarkTheme: Theme = {
  dark: false,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "rgb(0, 0, 0)",
    card: "rgb(255, 255, 255)",
    text: "rgb(255, 255, 255)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};
