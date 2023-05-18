import React from "react";
import { ElseStackList } from "../../types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Else from "./Else/Else";
import Settings from "./Settings/Settings";

const Stack = createNativeStackNavigator<ElseStackList>();

const ElseHome = () => {
  return (
    <Stack.Navigator initialRouteName="Else">
      <Stack.Screen name="Else" component={Else} options={{ title: "Еще" }} />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ title: "Настройки" }}
      />
    </Stack.Navigator>
  );
};

export default ElseHome;
