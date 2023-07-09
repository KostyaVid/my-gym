import { View, StyleSheet, Pressable } from "react-native";
import React from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import TimeCounter from "../../../components/TimeCounter/TimeCounter";
import ExerciseView from "../../../components/ExerciseView/ExerciseView";
import DragList, { DragListRenderItemInfo } from "react-native-draglist";
import globalStyle from "../../../utils/styles";
import Container from "../../../components/Container/Container";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ButtonDanger from "../../../components/Buttons/ButtonDanger/ButtonDanger";

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
  const { colors } = useTheme();

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
            order={index + 1}
            sessionID={sessionID}
            exerciseID={item[1]}
            onPress={() => {
              navigation.navigate("DailyHome", {
                screen: "Exercise",
                params: {
                  exerciseID: item[1],
                  trainingID: training.id,
                  sessionID,
                },
              });
            }}
          />

          <Pressable
            onPressIn={onDragStart}
            onPressOut={onDragEnd}
            style={styles.grid}
          >
            <MaterialCommunityIcons
              name="dots-grid"
              color={colors.onSurfaceDisabled}
              size={30}
            />
          </Pressable>
        </View>
      );
    };

    const session = store.sessions.getSession(sessionID);

    return (
      <View style={globalStyle.container}>
        <Container>
          <Text variant="displaySmall">{training.name}</Text>
          {session?.dateEnd ? (
            <Text
              variant="headlineSmall"
              style={[globalStyle.mt20, { opacity: 0.6 }]}
            >
              "Завершена"
            </Text>
          ) : (
            <View style={styles.time}>
              <Text>Время тренировки:</Text>
              <TimeCounter
                date={session?.dateStart ? session.dateStart : Date.now()}
              />
            </View>
          )}
        </Container>
        <Surface style={globalStyle.mt20}>
          <DragList
            data={training.exerciseIDs.map((tr, index) => [index, tr])}
            onReordered={onReordered}
            keyExtractor={(item: [number, string]) => item[0] + item[1]}
            renderItem={renderExersice}
          />
        </Surface>
        <Container style={styles.buttons}>
          <Button
            mode="elevated"
            icon="plus"
            onPress={() => {
              navigation.navigate("DailyHome", {
                screen: "AddExercise",
                params: { trainingID, sessionID },
              });
            }}
          >
            Добавить упражнение
          </Button>
          {session?.dateEnd ? (
            ""
          ) : (
            <ButtonDanger
              icon="stop-circle-outline"
              mode="contained"
              onPress={() => {
                store.currentProgramm.endCurrentSession();
                navigation.navigate("DailyHome", { screen: "Daily" });
              }}
            >
              Завершить тренировку
            </ButtonDanger>
          )}
        </Container>
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

const styles = StyleSheet.create({
  time: {
    marginTop: 5,
    flexDirection: "row",
    gap: 10,
  },
  buttons: {
    marginTop: 20,
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
