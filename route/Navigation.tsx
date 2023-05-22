import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../pages/Home/Home";
import DailyHome from "../pages/DailyHome/DailyHome";

import ProgrammsHome from "../pages/ProgrammsHome/ProgrammsHome";
import { RootStackParamList } from "../types";
import { StatusBar, useColorScheme } from "react-native";
import { GymDarkTheme, GymDefaultTheme } from "../utils/themes";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/rootStore.store";
import ElseHome from "../pages/ElseHome/ElseHome";

const Tab = createMaterialBottomTabNavigator<RootStackParamList>();

const Navigation = observer(() => {
  const store = useStore();
  const schemeSystem = useColorScheme();
  const scheme =
    store.theme.scheme === "default" ? schemeSystem : store.theme.scheme;
  const theme = scheme === "dark" ? GymDarkTheme : GymDefaultTheme;

  return (
    <>
      <NavigationContainer theme={theme}>
        <StatusBar animated={true} hidden={false} />

        <Tab.Navigator
          barStyle={{ backgroundColor: theme.colors.card }}
          activeColor={theme.colors.notification}
          inactiveColor={theme.colors.text}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{ tabBarLabel: "Главная" }}
          />
          <Tab.Screen
            name="DailyHome"
            component={DailyHome}
            options={{ tabBarLabel: "Дневник" }}
          />
          <Tab.Screen
            name="ProgrammsHome"
            component={ProgrammsHome}
            options={{ tabBarLabel: "Программы" }}
          />
          <Tab.Screen
            name="ElseHome"
            component={ElseHome}
            options={{ tabBarLabel: "Ещё" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
});

export default Navigation;
