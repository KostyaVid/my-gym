import {
  MD3LightTheme as DefaultTheme,
  MD3Theme,
  MD3DarkTheme,
} from "react-native-paper";

export const GymDefaultTheme: MD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(120,120,120)",
    background: "#fff",
  },
};

export const GymDarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: "#000",
  },
};
