import React from "react";
import { FlatList, View } from "react-native";
import { observer } from "mobx-react-lite";
import { RouteProp } from "@react-navigation/native";
import { DailyStackList, RootStackParamList } from "../../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useStore } from "../../../store/rootStore.store";
import P from "../../../components/P/P";
import globalStyle from "../../../utils/styles";
import Card from "../../../components/Card/Card";
import { TrainingDataProps, programmsData } from "../../../data/programms";
import ExerciseView from "../../../components/ExerciseView/ExerciseView";

type TrainingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

type TrainingProps = {
  navigation: TrainingScreenNavigationProp;
  route: RouteProp<DailyStackList, "Training">;
};

const Training = observer(({ route }: TrainingProps) => {
  const store = useStore();
  const trainingID = route.params.trainingID;
  let training: TrainingDataProps | undefined;
  for (let i = 0; i < programmsData.length; i++) {
    training = programmsData[i].trainings.find((el) => el.id === trainingID);
    if (training) break;
  }

  if (!training) return <P>Такая тренировка не найдена</P>;

  return (
    <View style={globalStyle.container}>
      <P>Тренировка: {training.name}</P>
      <Card>
        <FlatList
          data={training.exerciseIDs}
          renderItem={({ item, index }) => (
            <ExerciseView order={index + 1} exerciseID={item} />
          )}
        />
      </Card>
    </View>
  );
});

export default Training;
