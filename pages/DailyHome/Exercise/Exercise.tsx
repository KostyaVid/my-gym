import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import PlusButton from "../../../components/Buttons/PlusButton/PlusButton";
import globalStyle from "../../../utils/styles";
import ExerciseView from "../../../components/ExerciseView/ExerciseView";
import Container from "../../../components/Container/Container";
import { Button, Divider, Text, useTheme } from "react-native-paper";
import TableResults from "../../../components/TableResults/TableResults";
import TotalWeights from "../../../components/TotalWeights/TotalWeights";

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

  const exerciseSession = store.exercisesResults.getExerciseResult(
    exerciseID,
    sessionID
  );
  const prevSessionID =
    store.sessions.getPrevSessionIDByCurrentSessionID(sessionID);
  const exercisePrevSession = prevSessionID
    ? store.exercisesResults.getExerciseResult(exerciseID, prevSessionID)
    : undefined;

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
        <TotalWeights
          sessionID={sessionID}
          exerciseID={exerciseID}
          style={globalStyle.mt20}
        />

        {exerciseSession?.isFinish || (
          <>
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

const style = StyleSheet.create({});

export default Exercise;
