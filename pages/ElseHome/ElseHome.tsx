import React from "react";
import { ElseStackList } from "../../types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Else from "./Else/Else";
import Settings from "./Settings/Settings";
import NestingStackNavigator from "../../components/NestingStackNavigator/NestingStackNavigator";
import Rights from "./Rights/Rights";

const Stack = createNativeStackNavigator<ElseStackList>();

const ElseHome = () => {
  return (
    <NestingStackNavigator Stack={Stack}>
      <Stack.Screen name="Else" component={Else} options={{ title: "Еще" }} />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ title: "Настройки" }}
      />
      <Stack.Screen
        name="Rights"
        component={Rights}
        options={{ title: "Настройки" }}
      />
    </NestingStackNavigator>
  );
};

export default ElseHome;
