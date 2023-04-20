import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Daily from "./Daily/Daily";
import Training from "./Training/Training";
import Dimension from "./Dimension/Dimension";
import { DailyStackList } from "../../types";
import Session from "./Session/Session";

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
        initialParams={{ trainingID: "0" }}
      />
      <Stack.Screen name="Dimension" component={Dimension} />
    </Stack.Navigator>
  );
}
