import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TouchableHighlight,
} from "react-native";
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
  route: RouteProp<DailyStackList, "AddExercise">;
};

const AddExercise = observer(({ navigation, route }: Props) => {
  const sessionID = route.params.sessionID;
  const trainingID = route.params.trainingID;
  const store = useStore();
  return (
    <View>
      <Text>Выберите упражнение</Text>
      <FlatList
        data={store.customExercises.getAllExercisesSorted}
        renderItem={({ item }) => (
          <View>
            <TouchableHighlight>
              <Text>{item.name}</Text>
            </TouchableHighlight>
            <Button
              title="Добавить"
              onPress={() => {
                store.currentProgramm.addExerciseInTheCurrentProgramm(item.id);
                navigation.navigate("DailyHome", {
                  screen: "Session",
                  params: { trainingID, sessionID },
                });
              }}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
});

const style = StyleSheet.create({});

export default AddExercise;
