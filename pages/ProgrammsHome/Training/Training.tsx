import { FlatList, View } from "react-native";
import React from "react";
import { ProgrammStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import globalStyle from "../../../utils/styles";
import P from "../../../components/P/P";
import { programmsData } from "../../../data/programms";
import ExerciseView from "../../../components/ExerciseView/ExerciseView";

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
        <P size="h2">Тренировка не найдена.</P>
      </View>
    );
  return (
    <View style={globalStyle.container}>
      <P size="h1">{training.name}</P>
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
    </View>
  );
});

export default Training;
