import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./pages/Home/Home";
import DailyHome from "./pages/DailyHome/DailyHome";
import Else from "./pages/Else/Else";
import { useEffect } from "react";

import ProgrammsHome from "./pages/ProgrammsHome/ProgrammsHome";
import { RootStoreContext, rootStore } from "./store/rootStore.store";
import { RootStackParamList } from "./types";

const Tab = createMaterialBottomTabNavigator<RootStackParamList>();

const App = () => {
  useEffect(() => {
    rootStore.currentProgramm.programmAsyncStorage();
    rootStore.exercisesResults.loadExerciseStore();
  }, []);

  return (
    <RootStoreContext.Provider value={rootStore}>
      <NavigationContainer>
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
            name="Else"
            component={Else}
            options={{ tabBarLabel: "Ещё" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </RootStoreContext.Provider>
  );
};

export default App;
