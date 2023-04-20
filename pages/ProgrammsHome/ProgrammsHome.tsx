import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Programms from "./Programms/Programms";
import Programm from "./Programm/Programm";
import Session from "./Session/Session";
import { ProgrammStackList } from "../../types";

const Stack = createNativeStackNavigator<ProgrammStackList>();

export default function ProgrammsHome() {
  return (
    <Stack.Navigator initialRouteName="Programms">
      <Stack.Screen
        name="Programms"
        component={Programms}
        options={{ title: "Программмы" }}
      />
      <Stack.Screen
        name="Programm"
        component={Programm}
        getId={({ params }) => {
          if (params && "id" in params) {
            return params.id as string;
          }
        }}
        options={{ title: "Программа" }}
      />
      <Stack.Screen
        name="Session"
        component={Session}
        getId={({ params }) => {
          if (params && "id" in params) {
            return params.id as string;
          }
        }}
        options={{ title: "Тренировка" }}
      />
    </Stack.Navigator>
  );
}
