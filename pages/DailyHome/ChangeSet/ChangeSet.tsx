import React from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import { Set } from "../../../store/exercise.store";
import SetC from "../../../components/SetC/SetC";
import Container from "../../../components/Container/Container";
import { Text } from "react-native-paper";

type NewSetScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

type Props = {
  navigation: NewSetScreenNavigationProp;
  route: RouteProp<DailyStackList, "ChangeSet">;
};

const ChangeSet = observer(({ navigation, route }: Props) => {
  const exerciseID = route.params.exerciseID;
  const sessionID = route.params.sessionID;
  const trainingID = route.params.trainingID;
  const setID = route.params.setID;
  const store = useStore();
  const set = store.exercisesResults.getSet(exerciseID, sessionID, setID);
  if (!set)
    return (
      <Container>
        <Text variant="headlineSmall">Упражнение не найдено</Text>
      </Container>
    );

  const finishHandle = (w: number, c: number, comment: string) => {
    store.exercisesResults.changeExerciseResult(exerciseID, sessionID, {
      ...set,
      weight: w,
      count: c,
      comment,
    });

    navigation.navigate("DailyHome", {
      screen: "Exercise",
      params: { exerciseID, sessionID, trainingID },
    });
  };

  const backHandle = () => {
    navigation.goBack();
  };

  return (
    <SetC
      initWeight={set.weight.toString()}
      initCount={set.count.toString()}
      initComment={set.comment}
      backHandle={backHandle}
      FinishHandle={finishHandle}
    />
  );
});

export default ChangeSet;
