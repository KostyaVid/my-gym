import React from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import { Set } from "../../../store/exercise.store";
import SetC from "../../../components/SetC/SetC";

type NewSetScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

type Props = {
  navigation: NewSetScreenNavigationProp;
  route: RouteProp<DailyStackList, "NewSet">;
};

const NewSet = observer(({ navigation, route }: Props) => {
  const exerciseID = route.params.exerciseID;
  const sessionID = route.params.sessionID;
  const trainingID = route.params.trainingID;
  const store = useStore();
  const exercise = store.exercisesResults.getExercise(exerciseID);

  const finishHandle = (w: number, c: number, comment: string) => {
    const date = Date.now();
    const set: Set = {
      id: "p" + date,
      date: date,
      weight: w,
      count: c,
      comment: comment ? comment : undefined,
    };
    if (exercise) {
      store.exercisesResults.addExerciseResultInSession(
        exerciseID,
        sessionID,
        set
      );
    } else {
      store.exercisesResults.addFirstExerciseResultInSession(
        exerciseID,
        sessionID,
        set
      );
    }

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
      initWeight="0"
      initCount="0"
      initComment=""
      backHandle={backHandle}
      FinishHandle={finishHandle}
    />
  );
});

export default NewSet;
