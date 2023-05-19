import { View, Text, ImageSourcePropType } from "react-native";
import React from "react";
import { observer } from "mobx-react-lite";
import P from "../P/P";

export type MuscleInvolve = "none" | "maximum" | "average" | "minimum";
export type Muscle =
  | "biceps"
  | "triceps"
  | "lat"
  | "pectoral"
  | "deltoids"
  | "core"
  | "lumbus"
  | "trapezoids"
  | "quadriceps"
  | "bicepsFemoris"
  | "gastrocnemius"
  | "none";

export type Muscles = Partial<Record<Muscle, MuscleInvolve>>;
export type ExerciseType = "cardio" | "stretch" | "weight" | "static";

export type ExerciseID = { id: string };

export type ExerciseProps = ExerciseID & {
  name: string;
  thumbImg?: ImageSourcePropType;
  custom?: boolean;
};
export type ExerciseSecondaryProps = {
  description?: string;
  mainMuscle: Muscle;
  muscles?: Muscles;
  exerciseType?: ExerciseType;
};

const ExerciseC: React.FC<ExerciseProps> = observer(({ name }) => {
  return (
    <View>
      <P>{name}</P>
    </View>
  );
});

export default ExerciseC;
