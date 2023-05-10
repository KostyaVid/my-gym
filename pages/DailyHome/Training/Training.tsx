import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import { observer } from "mobx-react-lite";
import { RouteProp } from "@react-navigation/native";
import { DailyStackList, RootStackParamList } from "../../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useStore } from "../../../store/rootStore.store";

type TrainingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

type TrainingProps = {
  navigation: TrainingScreenNavigationProp;
  route: RouteProp<DailyStackList, "Training">;
};

const Training = observer(({ route }: TrainingProps) => {
  const programm = useStore().currentProgramm.currentProgramm;
  const id = route.params.trainingID;
  const training = programm?.trainings.find((item) => item.id === id);
  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        <Text>Тренировка: {training?.name}</Text>
      </View>
    </SafeAreaView>
  );
});

export default Training;
