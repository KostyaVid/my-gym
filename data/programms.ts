import { ImageSourcePropType } from "react-native";
import type { SessionProps } from "../components/SessionC/SessionC";

export type ProgrammProps = {
  id: string;
  name?: string;
  thumbImg?: ImageSourcePropType;
  description?: string;
};

export type TrainingDataProps = SessionProps & { exerciseIDs: string[] };
export type ProgrammDataProps = ProgrammProps & {
  trainings: TrainingDataProps[];
};
export const programmsData: ProgrammDataProps[] = [
  {
    id: "0",
    name: "Силовая программа для новичков",
    thumbImg: require("./../data/imgExercises/close-up-on-man-doing-crossfit-workout.jpg"),
    description:
      "Программа предназначенна исключительно для нужд тестирования приложения для разработчиков",
    trainings: [
      { id: "t0_0", name: "День тяг", exerciseIDs: ["e0", "e1", "e2"] },
      { id: "t0_1", name: "День ног", exerciseIDs: ["e2", "e3"] },
      { id: "t0_2", name: "День жимов", exerciseIDs: ["e0", "e2"] },
    ],
  },
  {
    id: "1",
    name: "Силовая программа по Мейцнеру",
    thumbImg: require("./../data/imgExercises/young-muscular-shirtless-caucasian-man-doing-pull-ups-on-horizontal-bar-at-playground-in-sunny-summer-s-day.jpg"),

    description:
      "Другая программа предназначенна исключительно для нужд тестирования приложения для разработчиков",
    trainings: [
      { id: "t1_0", name: "Тренировка 1", exerciseIDs: ["e0", "e1", "e2"] },
      { id: "t1_1", name: "Тренировка 2", exerciseIDs: ["e0", "e1", "e2"] },
      { id: "t1_2", name: "Тренировка 3", exerciseIDs: ["e0", "e1", "e2"] },
    ],
  },
  {
    id: "2",
    name: "Силовая программа для опытных",
    trainings: [
      { id: "t2_1", name: "Тренировка 2", exerciseIDs: ["e0", "e1", "e2"] },
      { id: "t2_0", name: "Тренировка 1", exerciseIDs: ["e0", "e1", "e2"] },
      { id: "t2_2", name: "Тренировка 3", exerciseIDs: ["e0", "e1", "e2"] },
    ],
  },
  {
    id: "3",
    name: "Программа для развития выносливости",
    description:
      "Другая программа предназначенна исключительно для нужд тестирования приложения для разработчиков",
    trainings: [
      { id: "t3_1", name: "Тренировка 2", exerciseIDs: ["e0", "e1", "e2"] },
      { id: "t3_0", name: "Тренировка 1", exerciseIDs: ["e0", "e1", "e2"] },
      { id: "t3_2", name: "Тренировка 3", exerciseIDs: ["e0", "e1", "e2"] },
    ],
  },
];
