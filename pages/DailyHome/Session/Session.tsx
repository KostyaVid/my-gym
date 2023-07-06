import { View, StyleSheet } from "react-native";
import React from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import TimeCounter from "../../../components/TimeCounter/TimeCounter";
import P from "../../../components/P/P";
import ExerciseView from "../../../components/ExerciseView/ExerciseView";
import DragList, { DragListRenderItemInfo } from "react-native-draglist";
import globalStyle from "../../../utils/styles";
import BasicButton from "../../../components/Buttons/BasicButton/BasicButton";
import Container from "../../../components/Container/Container";
import Touch from "../../../components/Touch/Touch";
import GridTab from "../../../components/GridTab/GridTab";
import { Card } from "react-native-paper";

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
  const sessionID = route.params.sessionID;
  const store = useStore();
  const training = store.currentProgramm.getTraining(trainingID);

  async function onReordered(fromIndex: number, toIndex: number) {
    if (!training?.exerciseIDs) return;
    const copy = [...training.exerciseIDs]; // Don't modify react data in-place
    const removed = copy.splice(fromIndex, 1);

    copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos
    store.currentProgramm.rewriteExerciseWithTraining(copy);
  }

  if (training && training.exerciseIDs) {
    const renderExersice = (info: DragListRenderItemInfo<string>) => {
      const { item, onDragStart, onDragEnd, isActive, index } = info;
      return (
        <View style={styles.row}>
          <ExerciseView
            key={item}
            order={index + 1}
            sessionID={sessionID}
            exerciseID={item}
            onPress={() => {
              navigation.navigate("DailyHome", {
                screen: "Exercise",
                params: {
                  exerciseID: item,
                  trainingID: training.id,
                  sessionID,
                },
              });
            }}
          />
          <Touch
            onPressIn={onDragStart}
            onPressOut={onDragEnd}
            style={styles.grid}
          >
            <GridTab />
          </Touch>
        </View>
      );
    };

    const session = store.sessions.getSession(sessionID);

    return (
      <View style={globalStyle.container}>
        <Container>
          <P size="h1">{training.name}</P>
          {session?.dateEnd ? (
            <P disable>"Завершена"</P>
          ) : (
            <View style={styles.time}>
              <P>Время тренировки:</P>
              <TimeCounter
                date={session?.dateStart ? session.dateStart : Date.now()}
              />
            </View>
          )}
        </Container>
        <Card>
          <DragList
            data={training.exerciseIDs}
            onReordered={onReordered}
            keyExtractor={(item: string) => item}
            renderItem={renderExersice}
          />
        </Card>
        <Container style={styles.buttons}>
          <BasicButton
            title="Добавить упражнение"
            onPress={() => {
              navigation.navigate("DailyHome", {
                screen: "AddExercise",
                params: { trainingID, sessionID },
              });
            }}
          />
          {session?.dateEnd ? (
            ""
          ) : (
            <BasicButton
              title="Завершить тренировку"
              variant="danger"
              onPress={() => {
                store.currentProgramm.endCurrentSession();
                navigation.navigate("DailyHome", { screen: "Daily" });
              }}
            />
          )}
        </Container>
      </View>
    );
  }

  return (
    <View>
      <P>Oops</P>
    </View>
  );
});

export default Session;

const styles = StyleSheet.create({
  time: {
    marginTop: 5,
    flexDirection: "row",
    gap: 10,
  },
  buttons: {
    marginTop: 10,
    flex: 1,
    justifyContent: "space-between",
    gap: 20,
  },
  grid: { alignItems: "flex-end", justifyContent: "center" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
});
