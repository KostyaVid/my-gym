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
    name: "Приседания со штангой",
    description:
      "Приседания — одно из самых эффективных силовых упражнений в плане набора мышечной массы. Движение является многосуставным, затрагивает большое количество крупных и мелких мышц. Практически все мышцы нижней части тела включаются в работу.",
    thumbImg: require("./../data/imgExercises/close-up-on-man-doing-crossfit-workout.jpg"),
    mainMuscle: "quadriceps",
    muscles: { quadriceps: "maximum" },
    exerciseType: "weight",
  },
  {
    id: "e1",
    name: "Подтягивания средним хватом",
    description:
      "Базовое физическое упражнение, развивающее группы мышц верхней части тела: широчайшая, бицепс, брахиалис, предплечья. Выполняется в висе.",
    thumbImg: require("./../data/imgExercises/young-muscular-shirtless-caucasian-man-doing-pull-ups-on-horizontal-bar-at-playground-in-sunny-summer-s-day.jpg"),
    mainMuscle: "none",
    muscles: { biceps: "maximum", lat: "maximum" },
    exerciseType: "weight",
  },
  { id: "e2", name: "Жим лежа со штагой", mainMuscle: "triceps" },
  { id: "e3", name: "Становая тяга", mainMuscle: "quadriceps" },
];
