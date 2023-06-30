import { StyleSheet, View } from "react-native";
import React from "react";
import { observer } from "mobx-react-lite";
import P from "../P/P";
import { useStore } from "../../store/rootStore.store";

type Props = {
  exerciseID: string;
  order: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
};

const ExerciseResultByData: React.FC<Props> = observer(
  ({ exerciseID, order }) => {
    const store = useStore();
    const exercise = store.exercisesResults.getExercise(exerciseID);
    if (!exercise) return <P>прошлых результатов не найдено</P>;
    let position = exercise.results.length - 1 - order;
    if (position < 0) return null;

    const exerciseResult = exercise.results[position];
    const session = store.sessions.getSession(exerciseResult.sessionID);
    const date = session?.dateStart;
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {date && <P>{new Date(date).toLocaleDateString()}</P>}
        <P>{Math.max(...exerciseResult.sets.map((el) => el.weight))} кг</P>
      </View>
    );
  }
);

export default ExerciseResultByData;

const styles = StyleSheet.create({});
