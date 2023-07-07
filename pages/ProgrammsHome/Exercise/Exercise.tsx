import { View } from "react-native";
import React from "react";
import { ProgrammStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import globalStyle from "../../../utils/styles";
import ExerciseView from "../../../components/ExerciseView/ExerciseView";
import Container from "../../../components/Container/Container";
import { Text } from "react-native-paper";

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
      <Text>Упражнение не найдено</Text>
    </View>;

  return (
    <View style={globalStyle.container}>
      <Container>
        <ExerciseView exerciseID={exerciseID} />
        {exercise?.description && <Text>Описание: {exercise.description}</Text>}
        {exercise?.exerciseType && <Text>Тип: {exercise.exerciseType}</Text>}
      </Container>
    </View>
  );
});

export default Exercise;
