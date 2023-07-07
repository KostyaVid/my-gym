import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { ProgrammStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import globalStyle from "../../../utils/styles";
import { programmsData } from "../../../data/programms";
import ExerciseView from "../../../components/ExerciseView/ExerciseView";
import { Surface, Text } from "react-native-paper";

type TrainingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ProgrammsHome"
>;

type Props = {
  navigation: TrainingScreenNavigationProp;
  route: RouteProp<ProgrammStackList, "Training">;
};

const Training = observer(({ navigation, route }: Props) => {
  const { trainingID, programmID } = route.params;
  const training = programmsData
    .find((programm) => programm.id === programmID)
    ?.trainings.find((train) => train.id === trainingID);
  if (!training)
    return (
      <View>
        <Text variant="headlineSmall">Тренировка не найдена.</Text>
      </View>
    );
  return (
    <View style={globalStyle.container}>
      <Text variant="displaySmall">{training.name}</Text>
      <Surface style={styles.containerExercises}>
        <FlatList
          data={training.exerciseIDs}
          renderItem={({ item, index }) => (
            <ExerciseView
              order={index + 1}
              exerciseID={item}
              onPress={() => {
                navigation.navigate("ProgrammsHome", {
                  screen: "Exercise",
                  params: { exerciseID: item },
                });
              }}
            />
          )}
        />
      </Surface>
    </View>
  );
});

const styles = StyleSheet.create({
  containerExercises: {
    marginTop: 20,
  },
});

export default Training;
