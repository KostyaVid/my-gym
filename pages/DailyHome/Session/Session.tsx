import { View, Text, FlatList, TouchableHighlight, Button } from "react-native";
import React from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import TimeCounter from "../../../components/TimeCounter/TimeCounter";
import { exerciseData } from "../../../data/exercises";

type SessionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

type Props = {
  navigation: SessionScreenNavigationProp;
  route: RouteProp<DailyStackList, "Session">;
};

const Session = observer(({ navigation, route }: Props) => {
  const trainingID = route.params.trainingID;
  const newSessionID = route.params.newSessionID;
  const store = useStore();
  const training = store.currentProgramm.getTraining(trainingID);
  console.log("training: ", training);
  console.log("currSess: ", store.currentProgramm.currentSessionID);

  if (training && store.currentProgramm.currentSessionID) {
    const currentSession = store.sessions.getSession(newSessionID);

    return (
      <View>
        <Text>Тренировка: {training.name}</Text>
        <Text>Время тренировки:</Text>
        <TimeCounter
          date={
            currentSession?.dateStart ? currentSession.dateStart : Date.now()
          }
        />
        <FlatList
          data={training.exerciseIDs}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              onPress={() => {
                navigation.navigate("DailyHome", {
                  screen: "Exercise",
                  params: {
                    exerciseID: item,
                    trainingID: training.id,
                    newSessionID,
                  },
                });
              }}
            >
              <View>
                <Text>
                  {(index + 1).toString() +
                    ". " +
                    exerciseData.find((ex) => ex.id === item)?.name}
                </Text>
                {store.exercisesResults.getExerciseSession(item, trainingID)
                  ?.isFinish && <Text>Завершено</Text>}
              </View>
            </TouchableHighlight>
          )}
        />
        <Button
          title="Добавить упражнение"
          onPress={() => {
            navigation.navigate("DailyHome", {
              screen: "AddExercise",
              params: { sessionID: trainingID, newSessionID },
            });
          }}
        />
        <Button
          title="Завершить тренировку"
          onPress={() => {
            store.currentProgramm.endCurrentSession();
            navigation.navigate("DailyHome", { screen: "Daily" });
          }}
        />
      </View>
    );
  }

  return (
    <View>
      <Text>Oops</Text>
    </View>
  );
});

export default Session;
