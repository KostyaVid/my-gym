import { View, Button, TextInput } from "react-native";
import React, { useState } from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import { Set } from "../../../store/exercise.store";
import P from "../../../components/P/P";
import globalStyle from "../../../utils/styles";

type NewSetScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

type Props = {
  navigation: NewSetScreenNavigationProp;
  route: RouteProp<DailyStackList, "NewSet">;
};

const NewSet = observer(({ navigation, route }: Props) => {
  const [weight, setWeight] = useState("0");
  const [count, setCount] = useState("0");

  const exerciseID = route.params.exerciseID;
  const sessionID = route.params.sessionID;
  const trainingID = route.params.trainingID;
  const store = useStore();
  const exercise = store.exercisesResults.getExercise(exerciseID);

  return (
    <View style={globalStyle.container}>
      <P>Вес:</P>
      <TextInput
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <P>Количество:</P>
      <TextInput keyboardType="numeric" value={count} onChangeText={setCount} />
      <Button
        title="Отмена"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Button
        title="ОК"
        onPress={() => {
          const date = Date.now();
          const set: Set = {
            id: "p" + date,
            date: date,
            weight: Number(weight),
            count: Number(count),
          };
          if (exercise) {
            store.exercisesResults.addExerciseResultInSession(
              exerciseID,
              sessionID,
              set
            );
          } else {
            store.exercisesResults.addFirstExerciseResultInSession(
              exerciseID,
              sessionID,
              set
            );
          }

          navigation.navigate("DailyHome", {
            screen: "Exercise",
            params: { exerciseID, sessionID, trainingID },
          });
        }}
      />
    </View>
  );
});

export default NewSet;
