import { ImageSourcePropType } from "react-native";

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

export type ExerciseFullProps = ExerciseProps & ExerciseSecondaryProps;

export const exerciseData: ExerciseFullProps[] = [
  {
    id: "e0",
    name: "Приседания со штангой и очень динное название, которое не влезает в одну строку",
    description:
      "Приседания со штангой на плечах для развития квдридрицепсов и ягодиц",
    thumbImg: require("./../data/imgExercises/close-up-on-man-doing-crossfit-workout.jpg"),
    mainMuscle: "quadriceps",
    muscles: { quadriceps: "maximum" },
    exerciseType: "weight",
  },
  { id: "e1", name: "Подтягивания", mainMuscle: "none" },
  { id: "e2", name: "Жим лежа со штагой", mainMuscle: "triceps" },
  { id: "e3", name: "Становая тяга", mainMuscle: "quadriceps" },
];
