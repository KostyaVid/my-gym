import {
  DarkTheme as DarkReactTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../pages/Home/Home";
import DailyHome from "../pages/DailyHome/DailyHome";
import { Provider, adaptNavigationTheme } from "react-native-paper";

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
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
    reactNavigationDark: DarkReactTheme,
    materialLight: GymDefaultTheme,
    materialDark: GymDarkTheme,
  });

  return (
    <>
      <Provider theme={scheme === "light" ? GymDefaultTheme : GymDarkTheme}>
        <NavigationContainer
          theme={scheme === "light" ? LightTheme : DarkTheme}
        >
          <StatusBar animated={true} hidden={false} />
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarLabel: "Главная",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="DailyHome"
              component={DailyHome}
              options={{
                tabBarLabel: "Дневник",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="calendar"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="ProgrammsHome"
              component={ProgrammsHome}
              options={{
                tabBarLabel: "Программы",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="clipboard-list-outline"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="ElseHome"
              component={ElseHome}
              options={{
                tabBarLabel: "Ещё",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
});

export default Navigation;
