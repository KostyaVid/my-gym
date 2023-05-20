import React from "react";
import { View } from "react-native";
import { observer } from "mobx-react-lite";
import { RouteProp } from "@react-navigation/native";
import { DailyStackList, RootStackParamList } from "../../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useStore } from "../../../store/rootStore.store";
import P from "../../../components/P/P";
import globalStyle from "../../../utils/styles";

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
    <View style={globalStyle.container}>
      <P>Тренировка: {training?.name}</P>
    </View>
  );
});

export default Training;
