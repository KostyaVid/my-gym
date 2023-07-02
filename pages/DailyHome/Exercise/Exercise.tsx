import { View, FlatList, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp, useTheme } from "@react-navigation/native";
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
import { StyleProp } from "react-native";

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
  const { colors } = useTheme();

  const styleRow: (index: number) => StyleProp<ViewStyle> = (index) => [
    style.containerSet,
    { borderColor: colors.border },
    index % 2 === 1
      ? { backgroundColor: colors.card }
      : index === 0
      ? { borderTopWidth: 1 }
      : {},
  ];

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
            <P size="h1" textAlign="center">
              Результаты:
            </P>
            <View style={[style.set, style.headerSet]}>
              <View style={style.dataNumber}>
                <P weight="500" textAlign="center">
                  №:
                </P>
              </View>
              <View style={style.data}>
                <P weight="500" textAlign="center">
                  Вес (кг):
                </P>
              </View>
              <View style={style.data}>
                <P weight="500" textAlign="center">
                  Количество:
                </P>
              </View>
            </View>
            <FlatList
              data={exerciseSession.sets}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View style={styleRow(index)}>
                  <View style={style.set}>
                    <View style={style.dataNumber}>
                      <P textAlign="center">{index + 1}</P>
                    </View>
                    <View style={style.data}>
                      <P textAlign="center">{item.weight} кг</P>
                    </View>
                    <View style={style.data}>
                      <P textAlign="center">{item.count}</P>
                    </View>
                  </View>
                  {item.comment && (
                    <View style={style.comment}>
                      <P disable>{item.comment}</P>
                    </View>
                  )}
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
  headerSet: {
    marginVertical: 10,
  },
  data: { flex: 1, padding: 5 },
  dataNumber: { flex: 0.5, padding: 5 },
  results: {
    flex: 1,
  },
  comment: {
    paddingHorizontal: 15,
    paddingBottom: 5,
    alignItems: "flex-end",
  },
});

export default Exercise;
