import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { useStore } from "../../store/rootStore.store";
import { observer } from "mobx-react-lite";
import ExerciseThumb from "../ExerciseThumb/ExerciseThumb";
import { Text, TouchableRipple } from "react-native-paper";

type ExerciseViewProps = {
  order?: number;
  exerciseID: string;
  sessionID?: string;
  onPress?: () => void;
};

const ExerciseView: React.FC<ExerciseViewProps> = observer(
  ({ order, sessionID, exerciseID, onPress }) => {
    const { exercisesResults } = useStore();
    const exercise = useStore().getExercise(exerciseID);
    if (!exercise)
      return (
        <TouchableRipple onPress={onPress} style={style.touch}>
          <View>
            <Text>Упражнение не найдено</Text>
          </View>
        </TouchableRipple>
      );

    const isFinish: boolean | undefined = sessionID
      ? exercisesResults.getExerciseSession(exerciseID, sessionID)?.isFinish
      : false;

    const styles: StyleProp<ViewStyle> = [style.container];
    if (isFinish) styles.push(style.disable);
    return (
      <TouchableRipple onPress={onPress} style={style.touch}>
        <View style={styles}>
          <ExerciseThumb thumbImg={exercise.thumbImg} />
          <Text style={style.text}>
            {(order !== undefined ? order.toString() + ". " : "") +
              exercise?.name}
          </Text>
        </View>
      </TouchableRipple>
    );
  }
);

export default ExerciseView;

const style = StyleSheet.create({
  touch: {
    flexShrink: 1,
    flexGrow: 1,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    padding: 10,
  },
  disable: {
    opacity: 0.5,
  },
  text: {
    flexShrink: 1,
  },
});
