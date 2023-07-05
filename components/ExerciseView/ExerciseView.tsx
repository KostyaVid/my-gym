import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import P from "../P/P";
import { useStore } from "../../store/rootStore.store";
import { observer } from "mobx-react-lite";
import { useTheme } from "@react-navigation/native";
import ExerciseThumb from "../ExerciseThumb/ExerciseThumb";
import Touch from "../Touch/Touch";

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
        <Touch onPress={onPress} style={style.touch}>
          <View>
            <P>Упражнение не найдено</P>
          </View>
        </Touch>
      );

    const isFinish: boolean | undefined = sessionID
      ? exercisesResults.getExerciseSession(exerciseID, sessionID)?.isFinish
      : false;

    const styles: StyleProp<ViewStyle> = [style.container];
    if (isFinish) styles.push(style.disable);
    return (
      <Touch onPress={onPress} style={style.touch}>
        <View style={styles}>
          <ExerciseThumb thumbImg={exercise.thumbImg} />
          <P>
            {(order !== undefined ? order.toString() + ". " : "") +
              exercise?.name}
          </P>
        </View>
      </Touch>
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
});
