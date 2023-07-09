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
import Container from "../../../components/Container/Container";
import { Button, Divider, IconButton, Surface, Text } from "react-native-paper";

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
        <Text variant="headlineMedium">Выберите упражнение.</Text>
      </Container>

      <Surface style={style.containerExercises}>
        <FlatList
          data={store.customExercises.getAllExercisesSorted}
          ItemSeparatorComponent={Divider}
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
              <IconButton
                mode="outlined"
                icon="plus"
                size={30}
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
      </Surface>

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
    paddingRight: 10,
  },
  exercise: {
    width: "60%",
  },
  containerExercises: { marginTop: 20 },
});

export default AddExercise;
