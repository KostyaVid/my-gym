import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Daily from "./Daily/Daily";
import Training from "./Training/Training";
import Dimension from "./Dimension/Dimension";
import { DailyStackList } from "../../types";
import Session from "./Session/Session";
import Exercise from "./Exercise/Exercise";
import NewSet from "./NewSet/NewSet";

const Stack = createNativeStackNavigator<DailyStackList>();

export default function DailyHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Daily" component={Daily} />
      <Stack.Screen
        name="Training"
        component={Training}
        initialParams={{ trainingID: "0" }}
      />
      <Stack.Screen
        name="Session"
        component={Session}
        initialParams={{ sessionID: "0" }}
      />
      <Stack.Screen
        name="Exercise"
        component={Exercise}
        initialParams={{ exerciseID: "e0", sessionID: "s0_0" }}
      />
      <Stack.Screen
        name="NewSet"
        component={NewSet}
        initialParams={{ exerciseID: "e0", sessionID: "s0_0" }}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen name="Dimension" component={Dimension} />
    </Stack.Navigator>
  );
}
