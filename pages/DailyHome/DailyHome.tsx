import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Daily from "./Daily/Daily";
import Training from "./Training/Training";
import Dimension from "./Dimension/Dimension";
import { DailyStackList } from "../../types";
import Session from "./Session/Session";
import Exercise from "./Exercise/Exercise";
import NewSet from "./NewSet/NewSet";
import AddExercise from "./AddExercise/AddExercise";

const Stack = createNativeStackNavigator<DailyStackList>();

export default function DailyHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Daily"
        component={Daily}
        options={{ title: "Ежедневник" }}
      />
      <Stack.Screen
        name="Training"
        component={Training}
        initialParams={{ trainingID: "0" }}
        options={{ title: "Обзор тренировки" }}
      />
      <Stack.Screen
        name="Session"
        component={Session}
        initialParams={{ trainingID: "0" }}
        options={{ title: "Тренировка" }}
      />
      <Stack.Screen
        name="Exercise"
        component={Exercise}
        initialParams={{ exerciseID: "e0", trainingID: "s0_0" }}
        options={{ title: "Упражнение" }}
      />
      <Stack.Screen
        name="NewSet"
        component={NewSet}
        initialParams={{ exerciseID: "e0", newSessionID: "s0_0" }}
        options={{ presentation: "modal", title: "Новый подход" }}
      />
      <Stack.Screen
        name="AddExercise"
        component={AddExercise}
        options={{ presentation: "modal", title: "Добавить упражнение" }}
      />

      <Stack.Screen name="Dimension" component={Dimension} />
    </Stack.Navigator>
  );
}
