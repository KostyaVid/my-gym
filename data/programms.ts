import type { ProgrammProps } from "../components/ProgrammC/ProgrammC";
import type { SessionProps } from "../components/SessionC/SessionC";

export type TrainingDataProps = SessionProps & { exerciseIDs: string[] };
export type ProgrammDataProps = ProgrammProps & {
  trainings: TrainingDataProps[];
};
export const programmsData: ProgrammDataProps[] = [
  {
    id: "0",
    name: "Базовая1",
    trainings: [
      { id: "t0_0", name: "Тренировка 1", exerciseIDs: ["e0", "e1", "e2"] },
      { id: "t0_1", name: "Тренировка 2", exerciseIDs: ["e2", "e3"] },
      { id: "t0_2", name: "Тренировка 3", exerciseIDs: ["e0", "e2"] },
    ],
  },
  {
    id: "1",
    name: "Базовая2",
    trainings: [
      { id: "t1_0", name: "Тренировка 1", exerciseIDs: ["e0", "e1", "e2"] },
      { id: "t1_1", name: "Тренировка 2", exerciseIDs: ["e0", "e1", "e2"] },
      { id: "t1_2", name: "Тренировка 3", exerciseIDs: ["e0", "e1", "e2"] },
    ],
  },
  {
    id: "2",
    name: "Базовая3",
    trainings: [
      { id: "t2_1", name: "Тренировка 2", exerciseIDs: ["e0", "e1", "e2"] },
      { id: "t2_0", name: "Тренировка 1", exerciseIDs: ["e0", "e1", "e2"] },
      { id: "t2_2", name: "Тренировка 3", exerciseIDs: ["e0", "e1", "e2"] },
    ],
  },
];
