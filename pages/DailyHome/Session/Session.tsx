import { View, Text, FlatList, TouchableHighlight, Button } from "react-native";
import React from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import TimeCounter from "../../../components/TimeCounter/TimeCounter";
import { ExerciseFullProps, exerciseData } from "../../../data/exercises";

type SessionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

type Props = {
  navigation: SessionScreenNavigationProp;
  route: RouteProp<DailyStackList, "Session">;
};

const Session = observer(({ navigation, route }: Props) => {
  const sessionID = route.params.sessionID;
  const store = useStore();
  const session = store.currentProgramm.currentProgramm?.session.find(
    ({ id }) => (id = sessionID)
  );

  if (session && store.currentProgramm.currentSessionID) {
    const currentSession = store.sessions.getSession(
      store.currentProgramm.currentSessionID
    );
    const exercisesResult = store.exercisesResults.exercises.filter((item) =>
      session.exerciseIDs.includes(item.id)
    );

    const exercisesResultInSession = exercisesResult?.map((item) => {
      return {
        results: item.results.find(
          (elem) => elem.sessionID === sessionID && elem.isFinish
        ),
        id: item.id,
      };
    });

    return (
      <View>
        <Text>Тренировка: {session.name}</Text>
        <Text>Время тренировки:</Text>
        <TimeCounter
          date={
            currentSession?.dateStart ? currentSession.dateStart : Date.now()
          }
        />
        <FlatList
          data={session.exerciseIDs}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              onPress={() => {
                navigation.navigate("DailyHome", {
                  screen: "Exercise",
                  params: { exerciseID: item, sessionID: session.id },
                });
              }}
            >
              <View>
                <Text>
                  {(index + 1).toString() +
                    ". " +
                    exerciseData.find((ex) => ex.id === item)?.name}
                </Text>
                {exercisesResultInSession.find((elem) => elem.id === item)
                  ?.results !== undefined && <Text>Завершено</Text>}
              </View>
            </TouchableHighlight>
          )}
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
