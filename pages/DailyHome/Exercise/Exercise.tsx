import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import React from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";

type ExerciseScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

type Props = {
  navigation: ExerciseScreenNavigationProp;
  route: RouteProp<DailyStackList, "Exercise">;
};

const Exercise = observer(({ navigation, route }: Props) => {
  const exerciseID = route.params.exerciseID;
  const sessionID = route.params.sessionID;
  const store = useStore();
  const exercise = store.exercisesResults.exercises.find(
    (item) => item.id === exerciseID
  );

  const exerciseSession = exercise?.results.findLast(
    (item) => item.sessionID === sessionID
  );

  return (
    <View>
      {exerciseSession ? (
        <FlatList
          data={exerciseSession.sets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <View style={style.set}>
                <Text>{item.weight}</Text>
                <Text>{item.count}</Text>
              </View>
              {item.comment && <Text>{item.comment}</Text>}
            </View>
          )}
        />
      ) : (
        <Text>Добавить подход</Text>
      )}
      <Button
        title="+"
        onPress={() => {
          navigation.navigate("DailyHome", {
            screen: "NewSet",
            params: {
              exerciseID: exerciseID,
              sessionID: sessionID,
            },
          });
        }}
      />
      <Button
        title="Завершить"
        onPress={() => {
          store.exercisesResults.finishSetsBySessionID(exerciseID, sessionID);
          navigation.navigate("DailyHome", {
            screen: "Session",
            params: { sessionID },
          });
        }}
      />
    </View>
  );
});

const style = StyleSheet.create({
  set: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Exercise;
