import { View, FlatList, StyleSheet, Button } from "react-native";
import React from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import PlusButton from "../../../components/Buttons/PlusButton/PlusButton";
import ExerciseView from "../../../components/ExerciseView/ExerciseView";
import globalStyle from "../../../utils/styles";
import P from "../../../components/P/P";

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
    <View style={globalStyle.container}>
      <P>Выберите упражнение</P>
      <FlatList
        data={store.customExercises.getAllExercisesSorted}
        renderItem={({ item, index }) => (
          <View>
            <ExerciseView
              order={index + 1}
              sessionID={sessionID}
              exerciseID={item.id}
            />
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
      <Button
        title="Создать новое"
        onPress={() => {
          navigation.navigate("DailyHome", { screen: "NewExercise" });
        }}
      />
      <PlusButton
        onPress={() => {
          navigation.navigate("DailyHome", { screen: "NewExercise" });
        }}
      />
    </View>
  );
});

const style = StyleSheet.create({});

export default AddExercise;
