import { ScrollView, View } from "react-native";
import React from "react";
import { ProgrammStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import globalStyle from "../../../utils/styles";
import ExerciseView from "../../../components/ExerciseView/ExerciseView";
import Container from "../../../components/Container/Container";
import { Divider, Text } from "react-native-paper";

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
    <ScrollView style={globalStyle.container}>
      <ExerciseView exerciseID={exerciseID} />
      {exercise?.description && (
        <>
          <Divider />
          <Container>
            <Text variant="titleMedium">Описание:</Text>
            <Text>{exercise.description}</Text>
          </Container>
        </>
      )}
      {exercise?.exerciseType && (
        <>
          <Divider />
          <Container>
            <Text variant="titleMedium">Тип:</Text>
            <Text>{exercise.exerciseType}</Text>
          </Container>
        </>
      )}
    </ScrollView>
  );
});

export default Exercise;
