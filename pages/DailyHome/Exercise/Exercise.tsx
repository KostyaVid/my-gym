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
import TableResults from "../../../components/TableResults/TableResults";

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

  const exerciseSession = store.exercisesResults.getExerciseResult(
    exerciseID,
    sessionID
  );
  const prevSessionID =
    store.sessions.getPrevSessionIDByCurrentSessionID(sessionID);
  const exercisePrevSession = prevSessionID
    ? store.exercisesResults.getExerciseResult(exerciseID, prevSessionID)
    : undefined;

  const lastIntensity =
    store.exercisesResults.getValueWorkSetsLastSession(exerciseID);

  const currentIntensity =
    store.exercisesResults.getValueWorkSetsCurrentSession(exerciseID);

  const handlePressRow = (id: string) => {
    navigation.navigate("DailyHome", {
      screen: "ChangeSet",
      params: {
        exerciseID,
        sessionID,
        trainingID,
        setID: id,
      },
    });
  };

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
        {exerciseSession || exercisePrevSession ? (
          <TableResults
            sets={exerciseSession?.sets}
            prevSets={exercisePrevSession?.sets}
            handlePressRow={handlePressRow}
          />
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

        {exerciseSession && (
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
  intensitySection: { flexDirection: "row" },
  intensityCell: {
    flexShrink: 1,
  },
});

export default Exercise;
