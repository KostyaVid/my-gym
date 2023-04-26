import {
  ExerciseProps,
  ExerciseSecondaryProps,
} from "../components/ExerciseC/ExerciseC";

export type ExerciseFullProps = ExerciseProps & ExerciseSecondaryProps;

export const exerciseData: ExerciseFullProps[] = [
  { id: "e0", name: "Приседания со штангой", mainMuscle: "quadriceps" },
  { id: "e1", name: "Подтягивания", mainMuscle: "none" },
  { id: "e2", name: "Жим лежа со штагой", mainMuscle: "triceps" },
  { id: "e3", name: "Становая тяга", mainMuscle: "quadriceps" },
];
