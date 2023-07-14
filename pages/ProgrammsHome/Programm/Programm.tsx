import { FlatList, StyleSheet } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProgrammStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import globalStyle from "../../../utils/styles";
import { useStore } from "../../../store/rootStore.store";
import Container from "../../../components/Container/Container";
import { Text } from "react-native-paper";
import ExerciseThumb from "../../../components/ExerciseThumb/ExerciseThumb";

type TrainingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

type Props = {
  navigation: TrainingScreenNavigationProp;
  route: RouteProp<ProgrammStackList, "Programm">;
};

const Programm = ({ route }: Props) => {
  const programmID = route.params.programmID;
  const store = useStore();
  let programm = store.getProgramm(programmID);

  if (!programm)
    return (
      <Container>
        <Text>Программа не найдена</Text>
      </Container>
    );
  return (
    <Container style={globalStyle.container}>
      <ExerciseThumb thumbImg={programm.thumbImg} />
      <Text>{programm.name}</Text>
      <Text>{programm.description}</Text>
      <FlatList
        data={programm.trainings}
        renderItem={({ item, index }) => (
          <Text>{index + ". " + item.name}</Text>
        )}
      />
    </Container>
  );
};

export default Programm;

const styles = StyleSheet.create({});
