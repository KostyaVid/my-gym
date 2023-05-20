import { View, FlatList, StyleSheet, Button } from "react-native";
import React from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import PlusButton from "../../../components/Buttons/PlusButton/PlusButton";
import P from "../../../components/P/P";
import globalStyle from "../../../utils/styles";

type ExerciseScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

type Props = {
  navigation: ExerciseScreenNavigationProp;
  route: RouteProp<DailyStackList, "Exercise">;
};

const Exercise = observer(({ navigation, route }: Props) => {
  const sessionID = route.params.sessionID;
  const exerciseID = route.params.exerciseID;
  const trainingID = route.params.trainingID;
  const store = useStore();
  const exerciseResult = store.exercisesResults.getExercise(exerciseID);
  const exerciseSession = exerciseResult?.results.findLast(
    (item) => item.sessionID === sessionID
  );

  let exercise = store.getExercise(exerciseID);

  return (
    <View style={globalStyle.container}>
      {exercise && <P>{exercise.name}</P>}
      {exerciseSession ? (
        <FlatList
          data={exerciseSession.sets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <View style={style.set}>
                <P>{item.weight}</P>
                <P>{item.count}</P>
              </View>
              {item.comment && <P>{item.comment}</P>}
            </View>
          )}
        />
      ) : (
        <P>Еще не выполнялось</P>
      )}

      {exerciseSession?.isFinish || (
        <Button
          title="Завершить"
          onPress={() => {
            store.exercisesResults.finishSetsBySessionID(exerciseID, sessionID);
            navigation.navigate("DailyHome", {
              screen: "Session",
              params: { trainingID, sessionID },
            });
          }}
        />
      )}
      <P>
        Средняя предыдущая интенсивность:
        {store.exercisesResults.getValueWorkSetsLastSession(exerciseID)}
      </P>
      <PlusButton
        onPress={() => {
          navigation.navigate("DailyHome", {
            screen: "NewSet",
            params: {
              exerciseID,
              trainingID,
              sessionID,
            },
          });
        }}
      />
    </View>
  );
});

const style = StyleSheet.create({
  set: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
  },
});

export default Exercise;
