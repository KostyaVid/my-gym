import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./pages/Home/Home";
import DailyHome from "./pages/DailyHome/DailyHome";
import Else from "./pages/ElseHome/Else/Else";

import ProgrammsHome from "./pages/ProgrammsHome/ProgrammsHome";
import { RootStoreContext, rootStore } from "./store/rootStore.store";
import Navigation from "./Navigation";

const App = () => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <Navigation />
    </RootStoreContext.Provider>
  );
};

export default App;
