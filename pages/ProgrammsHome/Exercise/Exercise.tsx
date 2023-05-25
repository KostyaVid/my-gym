import { View } from "react-native";
import React from "react";
import { ProgrammStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import globalStyle from "../../../utils/styles";
import P from "../../../components/P/P";
import ExerciseThumb from "../../../components/ExerciseThumb/ExerciseThumb";

type ExerciseScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ProgrammsHome"
>;

type Props = {
  navigation: ExerciseScreenNavigationProp;
  route: RouteProp<ProgrammStackList, "Exercise">;
};

const Exercise = observer(({ navigation, route }: Props) => {
  const exerciseID = route.params.exerciseID;
  const exercise = useStore().getExercise(exerciseID);
  if (!exercise)
    <View style={globalStyle.container}>
      <P>Упражнение не найдено</P>
    </View>;

  return (
    <View style={globalStyle.container}>
      <ExerciseThumb thumbImg={exercise?.thumbImg} />
      <P>{exercise?.name}</P>
      {exercise?.description && <P>Описание: {exercise.description}</P>}
      {exercise?.exerciseType && <P>Тип: {exercise.exerciseType}</P>}
    </View>
  );
});

export default Exercise;