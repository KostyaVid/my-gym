import {
  ExerciseProps,
  ExerciseSecondaryProps,
} from "../components/ExerciseC/ExerciseC";

export type ExerciseFullProps = ExerciseProps & ExerciseSecondaryProps;

export const exerciseData: ExerciseFullProps[] = [
  {
    id: "e0",
    name: "Приседания со штангой",
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
