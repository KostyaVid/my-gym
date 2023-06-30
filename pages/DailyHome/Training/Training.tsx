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
import Container from "../../../components/Container/Container";

type TrainingScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type TrainingProps = {
  navigation: TrainingScreenNavigationProp;
  route: RouteProp<DailyStackList, "Training">;
};

const Training = observer(({ route, navigation }: TrainingProps) => {
  const trainingID = route.params.trainingID;
  let training: TrainingDataProps | undefined;
  for (let i = 0; i < programmsData.length; i++) {
    training = programmsData[i].trainings.find((el) => el.id === trainingID);
    if (training) break;
  }

  if (!training) return <P size="h3">Такая тренировка не найдена</P>;

  return (
    <View style={globalStyle.container}>
      <Container>
        <P size="h1">{training.name}</P>
      </Container>
      <Card>
        <FlatList
          data={training.exerciseIDs}
          renderItem={({ item, index }) => (
            <ExerciseView
              order={index + 1}
              exerciseID={item}
              onPress={() => {
                navigation.navigate("ProgrammsHome", {
                  screen: "Exercise",
                  params: { exerciseID: item },
                });
              }}
            />
          )}
        />
      </Card>
    </View>
  );
});

export default Training;
