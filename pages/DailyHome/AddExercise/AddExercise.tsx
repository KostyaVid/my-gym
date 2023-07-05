import { View, FlatList, StyleSheet } from "react-native";
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
import BasicButton from "../../../components/Buttons/BasicButton/BasicButton";
import Container from "../../../components/Container/Container";
import Touch from "../../../components/Touch/Touch";
import HR from "../../../components/HR/HR";

type ExerciseScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

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
      <Container>
        <P size="h1">Выберите упражнение.</P>
        <FlatList
          data={store.customExercises.getAllExercisesSorted}
          ItemSeparatorComponent={HR}
          renderItem={({ item, index }) => (
            <View style={style.item}>
              <ExerciseView
                onPress={() => {
                  navigation.navigate("ProgrammsHome", {
                    screen: "Exercise",
                    params: {
                      exerciseID: item.id,
                    },
                  });
                }}
                order={index + 1}
                sessionID={sessionID}
                exerciseID={item.id}
              />
              <BasicButton
                title="Доб."
                onPress={() => {
                  store.currentProgramm.addExerciseInTheCurrentProgramm(
                    item.id
                  );
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
      </Container>

      <PlusButton
        onPress={() => {
          navigation.navigate("DailyHome", { screen: "NewExercise" });
        }}
      />
    </View>
  );
});

const style = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  exercise: {
    width: "60%",
  },
});

export default AddExercise;
