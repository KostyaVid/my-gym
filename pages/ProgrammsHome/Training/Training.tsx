import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { ProgrammStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import globalStyle from "../../../utils/styles";
import { TrainingDataProps, programmsData } from "../../../data/programms";
import ExerciseView from "../../../components/ExerciseView/ExerciseView";
import { Divider, Surface, Text } from "react-native-paper";
import { useStore } from "../../../store/rootStore.store";

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
  const store = useStore();
  let training = store
    .getProgramm(programmID)
    ?.trainings.find((data) => (data.id = trainingID));
  if (!training)
    return (
      <View>
        <Text variant="headlineSmall">Тренировка не найдена.</Text>
      </View>
    );
  return (
    <View style={globalStyle.container}>
      <Text variant="displaySmall" style={globalStyle.padding10}>
        {training.name}
      </Text>
      <Surface style={globalStyle.mt20}>
        <FlatList
          data={training.exerciseIDs}
          ItemSeparatorComponent={Divider}
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

const styles = StyleSheet.create({});

export default Training;
