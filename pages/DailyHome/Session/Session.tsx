import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Button,
  Image,
  ListRenderItem,
} from "react-native";
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
  const sessionID = route.params.sessionID;
  const store = useStore();
  const training = store.currentProgramm.getTraining(trainingID);

  if (training) {
    const renderExersice: ListRenderItem<string> = ({ item, index }) => {
      const exercise = store.getExercise(item);

      return (
        <TouchableHighlight
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
        >
          <View>
            {exercise?.thumbImg ? (
              <Image
                source={exercise.thumbImg}
                style={{ width: 60, height: 60, borderRadius: 30 }}
              />
            ) : (
              <Image
                source={require("./../../../data/imgExercises/none.jpg")}
                style={{ width: 60, height: 60, borderRadius: 30 }}
              />
            )}
            <Text>{(index + 1).toString() + ". " + exercise?.name}</Text>
            {store.exercisesResults.getExerciseSession(item, sessionID)
              ?.isFinish && <Text>Завершено</Text>}
          </View>
        </TouchableHighlight>
      );
    };

    const session = store.sessions.getSession(sessionID);

    return (
      <View>
        <Text>Тренировка: {training.name}</Text>
        {session?.dateEnd ? (
          <Text>"Завершена"</Text>
        ) : (
          <View>
            <Text>Время тренировки:</Text>
            <TimeCounter
              date={session?.dateStart ? session.dateStart : Date.now()}
            />
          </View>
        )}

        <FlatList
          data={training.exerciseIDs}
          keyExtractor={(item, index) => item + index}
          renderItem={renderExersice}
        />
        <Button
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
          <Button
            title="Завершить тренировку"
            onPress={() => {
              store.currentProgramm.endCurrentSession();
              navigation.navigate("DailyHome", { screen: "Daily" });
            }}
          />
        )}
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
