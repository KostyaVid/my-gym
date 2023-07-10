import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import PlusButton from "../../../components/Buttons/PlusButton/PlusButton";
import globalStyle from "../../../utils/styles";
import ExerciseResultByData from "../../../components/ExerciseResultByData/ExerciseResultByData";
import ExerciseView from "../../../components/ExerciseView/ExerciseView";
import Container from "../../../components/Container/Container";
import {
  Button,
  DataTable,
  Divider,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

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
  const { colors } = useTheme();
  const exerciseResult = store.exercisesResults.getExercise(exerciseID);

  const exerciseSession = exerciseResult?.results.findLast(
    (item) => item.sessionID === sessionID
  );

  const hasComment = exerciseSession?.sets.find(
    (set) => set.comment !== undefined
  );

  const lastIntensity =
    store.exercisesResults.getValueWorkSetsLastSession(exerciseID);

  const currentIntensity =
    store.exercisesResults.getValueWorkSetsCurrentSession(exerciseID);

  return (
    <View style={globalStyle.container}>
      <ScrollView>
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
        <Divider />
        {exerciseSession ? (
          <>
            <Container style={style.results}>
              <Text variant="displaySmall">Результаты:</Text>
            </Container>
            <Surface style={style.dataContainer}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title sortDirection="descending">
                    №:
                  </DataTable.Title>
                  <DataTable.Title>Вес (кг)</DataTable.Title>
                  <DataTable.Title>Повторы:</DataTable.Title>
                  {hasComment && (
                    <DataTable.Title>Комментарии:</DataTable.Title>
                  )}
                </DataTable.Header>
                {exerciseSession.sets.map((item, index) => (
                  <DataTable.Row
                    key={item.id}
                    onPress={() => {
                      navigation.navigate("DailyHome", {
                        screen: "ChangeSet",
                        params: {
                          exerciseID,
                          sessionID,
                          trainingID,
                          setID: item.id,
                        },
                      });
                    }}
                  >
                    <DataTable.Cell textStyle={style.dataCell}>
                      {index}
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={style.dataCell}>
                      {item.weight + " кг"}
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={style.dataCell}>
                      {item.count}
                    </DataTable.Cell>
                    {hasComment && (
                      <DataTable.Cell>{item.comment}</DataTable.Cell>
                    )}
                  </DataTable.Row>
                ))}
              </DataTable>
            </Surface>
          </>
        ) : (
          <Container>
            <Text variant="titleMedium">Еще не выполнялось.</Text>
          </Container>
        )}
        {exerciseSession && (
          <Container style={style.intensitySection}>
            <View style={style.intensityCell}>
              <Text style={globalStyle.mt20}>
                Средняя интенсивность на текущей тренировке:
              </Text>
              <Text
                variant="headlineSmall"
                style={{
                  color:
                    currentIntensity < lastIntensity
                      ? colors.error
                      : colors.onBackground,
                }}
              >
                {currentIntensity + "кг"}
              </Text>
            </View>
            <View style={style.intensityCell}>
              <Text style={globalStyle.mt20}>
                Средняя интенсивность на прошлой тренировке:
              </Text>
              <Text variant="headlineSmall">{lastIntensity + "кг"}</Text>
            </View>
          </Container>
        )}
        {exerciseSession?.isFinish || (
          <>
            <Divider />
            <Container>
              <Button
                icon="stop-circle"
                mode="elevated"
                style={globalStyle.mt20}
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
              >
                Завершить
              </Button>
            </Container>
          </>
        )}

        {exerciseResult && (
          <>
            <Divider style={globalStyle.mt20} />
            <Container>
              <View style={{ marginTop: 20 }}>
                <ExerciseResultByData exerciseID={exerciseID} order={1} />
                <ExerciseResultByData exerciseID={exerciseID} order={2} />
                <ExerciseResultByData exerciseID={exerciseID} order={3} />
                <View style={{ marginTop: 20 }}>
                  <Button
                    icon="eye-outline"
                    mode="elevated"
                    onPress={() => {
                      navigation.navigate("DailyHome", {
                        screen: "AllResults",
                        params: { exerciseID },
                      });
                    }}
                  >
                    Посмотреть все результаты
                  </Button>
                </View>
              </View>
            </Container>
          </>
        )}
      </ScrollView>
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
  results: {
    flex: 1,
  },
  dataContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  dataCell: {
    fontSize: 20,
  },
  intensitySection: { flexDirection: "row" },
  intensityCell: {
    flexShrink: 1,
  },
});

export default Exercise;
