import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import Container from "../Container/Container";
import { useStore } from "../../store/rootStore.store";
import { Text } from "react-native-paper";
import { observer } from "mobx-react-lite";
import DiffAbove from "../DiffAbove/DiffAbove";

type Props = {
  sessionID: string;
  exerciseID: string;
  style?: StyleProp<ViewStyle>;
};

const TotalWeights: React.FC<Props> = observer(
  ({ sessionID, exerciseID, style }) => {
    const { exercisesResults } = useStore();
    const totalWeights = exercisesResults.getTotalWeightInSession(
      exerciseID,
      sessionID
    );
    const totalWeightsLastSession =
      exercisesResults.getTotalWeightInLastSession(exerciseID, sessionID);
    return (
      <Container style={[styles.weight, style]}>
        <Text variant="titleMedium">Тоннаж: </Text>
        <Text variant="titleLarge">{totalWeights}</Text>
        <DiffAbove value={totalWeights - totalWeightsLastSession} />
        <Text variant="titleLarge">кг.</Text>
      </Container>
    );
  }
);

export default TotalWeights;

const styles = StyleSheet.create({
  weight: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 3,
  },
});
