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
import ChooseSession from "./ChooseSession/ChooseSession";
import NewExercise from "./NewExercise/NewExercise";
import NestingStackNavigator from "../../components/NestingStackNavigator/NestingStackNavigator";
import AllResults from "./AllResults/AllResults";
import ChangeSet from "./ChangeSet/ChangeSet";

const Stack = createNativeStackNavigator<DailyStackList>();

export default function DailyHome() {
  return (
    <NestingStackNavigator Stack={Stack}>
      <Stack.Screen
        name="Daily"
        component={Daily}
        options={{ title: "Ежедневник" }}
      />
      <Stack.Screen
        name="Training"
        component={Training}
        initialParams={{ trainingID: "t0_0" }}
        options={{ title: "Обзор тренировки" }}
      />
      <Stack.Screen
        name="Session"
        component={Session}
        initialParams={{ trainingID: "t0_0" }}
        options={{ title: "Тренировка" }}
      />
      <Stack.Screen
        name="ChooseSession"
        component={ChooseSession}
        initialParams={{ date: Date.now() }}
        options={{ title: "Тренировки" }}
      />
      <Stack.Screen
        name="Exercise"
        component={Exercise}
        initialParams={{ exerciseID: "e0", trainingID: "t0_0" }}
        options={{ title: "Упражнение" }}
      />
      <Stack.Screen
        name="NewSet"
        component={NewSet}
        initialParams={{ exerciseID: "e0", sessionID: "s0_0" }}
        options={{ presentation: "modal", title: "Новый подход" }}
      />
      <Stack.Screen
        name="ChangeSet"
        component={ChangeSet}
        options={{ presentation: "modal", title: "Изменить результат" }}
      />
      <Stack.Screen
        name="AddExercise"
        component={AddExercise}
        options={{ presentation: "modal", title: "Добавить упражнение" }}
      />
      <Stack.Screen
        name="AllResults"
        component={AllResults}
        initialParams={{ exerciseID: "e0" }}
        options={{ presentation: "modal", title: "Все результаты" }}
      />
      <Stack.Screen
        name="NewExercise"
        component={NewExercise}
        options={{ presentation: "modal", title: "Создать упражнение" }}
      />

      <Stack.Screen name="Dimension" component={Dimension} />
    </NestingStackNavigator>
  );
}
