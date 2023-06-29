import {
  StyleProp,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import P from "../P/P";
import { useStore } from "../../store/rootStore.store";
import { observer } from "mobx-react-lite";
import { useTheme } from "@react-navigation/native";
import ExerciseThumb from "../ExerciseThumb/ExerciseThumb";

type ExerciseViewProps = {
  order?: number;
  exerciseID: string;
  sessionID?: string;
  onPress?: () => void;
};

const ExerciseView: React.FC<ExerciseViewProps> = observer(
  ({ order, sessionID, exerciseID, onPress }) => {
    const { exercisesResults } = useStore();
    const { colors } = useTheme();
    const exercise = useStore().getExercise(exerciseID);
    if (!exercise)
      return (
        <View>
          <P>Упражнение не найдено</P>
        </View>
      );

    const isFinish: boolean | undefined = sessionID
      ? exercisesResults.getExerciseSession(exerciseID, sessionID)?.isFinish
      : false;

    const styles: StyleProp<ViewStyle> = [style.container];
    if (isFinish) styles.push(style.disable);
    if (order === 1 || order === undefined)
      return (
        <TouchableHighlight
          onPress={onPress}
          activeOpacity={0.6}
          underlayColor="rgba(90,90,90,0.5)"
        >
          <View style={styles}>
            <ExerciseThumb thumbImg={exercise.thumbImg} />
            <P>{(order ? order.toString() + ". " : "") + exercise?.name}</P>
          </View>
        </TouchableHighlight>
      );
    return (
      <TouchableHighlight
        onPress={onPress}
        activeOpacity={0.6}
        underlayColor="rgba(90,90,90,0.5)"
      >
        <View style={[style.border, { borderColor: colors.border }]}>
          <View style={styles}>
            <ExerciseThumb thumbImg={exercise.thumbImg} />
            <P>{order.toString() + ". " + exercise?.name}</P>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
);

export default ExerciseView;

const style = StyleSheet.create({
  border: {
    borderTopWidth: 1,
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
