import {
  ExerciseProps,
  ExerciseSecondaryProps,
} from "../components/Exercise/Exercise";

export type ExerciseFullProps = ExerciseProps & ExerciseSecondaryProps;

export const exerciseData: ExerciseFullProps[] = [
  { id: "e0", name: "Приседания со штангой" },
  { id: "e1", name: "Подтягивания" },
  { id: "e2", name: "Жим лежа со штагой" },
  { id: "e3", name: "Становая тяга" },
];
