import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Programms from "./Programms/Programms";
import Programm from "./Programm/Programm";
import { ProgrammStackList } from "../../types";
import NestingStackNavigator from "../../components/NestingStackNavigator/NestingStackNavigator";
import Exercise from "./Exercise/Exercise";
import Training from "./Training/Training";

const Stack = createNativeStackNavigator<ProgrammStackList>();

export default function ProgrammsHome() {
  return (
    <NestingStackNavigator Stack={Stack}>
      <Stack.Screen
        name="Programms"
        component={Programms}
        options={{ title: "Программмы" }}
      />
      <Stack.Screen
        name="Programm"
        component={Programm}
        options={{ title: "Программа" }}
      />
      <Stack.Screen
        name="Training"
        component={Training}
        options={{ title: "Тренировка" }}
      />
      <Stack.Screen
        name="Exercise"
        component={Exercise}
        options={{ title: "Упражнение" }}
      />
    </NestingStackNavigator>
  );
}
