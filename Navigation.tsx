import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./pages/Home/Home";
import DailyHome from "./pages/DailyHome/DailyHome";

import ProgrammsHome from "./pages/ProgrammsHome/ProgrammsHome";
import { RootStackParamList } from "./types";
import { useColorScheme } from "react-native";
import { GymDarkTheme, GymDefaultTheme } from "./utils/thems";
import { observer } from "mobx-react-lite";
import { useStore } from "./store/rootStore.store";
import ElseHome from "./pages/ElseHome/ElseHome";

const Tab = createMaterialBottomTabNavigator<RootStackParamList>();

const Navigation = observer(() => {
  const store = useStore();
  const schemeSystem = useColorScheme();
  const scheme =
    store.theme.scheme === "default" ? schemeSystem : store.theme.scheme;
  return (
    <NavigationContainer
      theme={scheme === "dark" ? GymDarkTheme : GymDefaultTheme}
    >
      <Tab.Navigator>
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
  );
});

export default Navigation;
