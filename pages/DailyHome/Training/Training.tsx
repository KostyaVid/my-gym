import React from "react";
import { FlatList, View } from "react-native";
import { observer } from "mobx-react-lite";
import { RouteProp } from "@react-navigation/native";
import { DailyStackList, RootStackParamList } from "../../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import globalStyle from "../../../utils/styles";
import { TrainingDataProps, programmsData } from "../../../data/programms";
import ExerciseView from "../../../components/ExerciseView/ExerciseView";
import Container from "../../../components/Container/Container";
import { Divider, Surface, Text } from "react-native-paper";
import { useStore } from "../../../store/rootStore.store";

type TrainingScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type TrainingProps = {
  navigation: TrainingScreenNavigationProp;
  route: RouteProp<DailyStackList, "Training">;
};

const Training = observer(({ route, navigation }: TrainingProps) => {
  const trainingID = route.params.trainingID;
  const { currentProgramm } = useStore();
  let training = currentProgramm.getTraining(trainingID);
  if (!training)
    return <Text variant="headlineSmall">Такая тренировка не найдена</Text>;

  return (
    <View style={globalStyle.container}>
      <Container>
        <Text variant="displaySmall">{training.name}</Text>
      </Container>
      <Surface>
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
          ItemSeparatorComponent={Divider}
        />
      </Surface>
    </View>
  );
});

export default Training;
