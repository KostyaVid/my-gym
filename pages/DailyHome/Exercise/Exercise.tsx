import { View, FlatList, StyleSheet } from "react-native";
import React from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import PlusButton from "../../../components/Buttons/PlusButton/PlusButton";
import P from "../../../components/P/P";
import globalStyle from "../../../utils/styles";
import ExerciseResultByData from "../../../components/ExerciseResultByData/ExerciseResultByData";
import BasicButton from "../../../components/Buttons/BasicButton/BasicButton";
import ExerciseView from "../../../components/ExerciseView/ExerciseView";
import Container from "../../../components/Container/Container";

type ExerciseScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

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

  return (
    <View style={globalStyle.container}>
      <Container>
        <ExerciseView
          exerciseID={exerciseID}
          onPress={() => {
            navigation.navigate("ProgrammsHome", {
              screen: "Exercise",
              params: {
                exerciseID: exerciseID,
              },
            });
          }}
        />
      </Container>

      <Container style={style.results}>
        {exerciseSession ? (
          <>
            <View style={style.set}>
              <P>Вес (кг):</P>
              <P>Количество:</P>
            </View>
            <FlatList
              data={exerciseSession.sets}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View
                  style={[
                    style.containerSet,
                    index === 0 ? { borderTopWidth: 1 } : {},
                  ]}
                >
                  <View style={style.set}>
                    <P>{item.weight}</P>
                    <P>{item.count}</P>
                  </View>
                  {item.comment && <P>{item.comment}</P>}
                </View>
              )}
            />
          </>
        ) : (
          <P disable>Еще не выполнялось</P>
        )}
        <P disable>
          Средняя предыдущая интенсивность:
          {store.exercisesResults.getValueWorkSetsLastSession(exerciseID)}
        </P>
      </Container>
      <Container>
        {exerciseSession?.isFinish || (
          <BasicButton
            title="Завершить"
            onPress={() => {
              store.exercisesResults.finishSetsBySessionID(
                exerciseID,
                sessionID
              );
              navigation.navigate("DailyHome", {
                screen: "Session",
                params: { trainingID, sessionID },
              });
            }}
          />
        )}

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
        {exerciseResult && (
          <View style={{ marginTop: 20 }}>
            <ExerciseResultByData exerciseID={exerciseID} order={1} />
            <ExerciseResultByData exerciseID={exerciseID} order={2} />
            <ExerciseResultByData exerciseID={exerciseID} order={3} />
            <View style={{ marginTop: 20 }}>
              <BasicButton
                title="Посмотреть все результаты"
                onPress={() => {
                  navigation.navigate("DailyHome", {
                    screen: "AllResults",
                    params: { exerciseID },
                  });
                }}
              />
            </View>
          </View>
        )}
      </Container>
    </View>
  );
});

const style = StyleSheet.create({
  containerSet: {
    borderBottomWidth: 1,
  },
  set: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  results: {
    flex: 1,
  },
});

export default Exercise;
