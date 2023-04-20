import type { ProgrammProps } from "../components/ProgrammC/ProgrammC";
import type { SessionProps } from "../components/SessionC/SessionC";

export type SessionDataProps = SessionProps & { exerciseIDs: string[] };
export type ProgrammDataProps = ProgrammProps & { session: SessionDataProps[] };
export const programmsData: ProgrammDataProps[] = [
  {
    id: "0",
    name: "Базовая1",
    session: [
      { id: "0_0", name: "Тренировка 1", exerciseIDs: ["0", "1", "2"] },
      { id: "0_1", name: "Тренировка 2", exerciseIDs: ["2", "3"] },
      { id: "0_2", name: "Тренировка 3", exerciseIDs: ["0", "2"] },
    ],
  },
  {
    id: "1",
    name: "Базовая2",
    session: [
      { id: "1_0", name: "Тренировка 1", exerciseIDs: ["0", "1", "2"] },
      { id: "1_1", name: "Тренировка 2", exerciseIDs: ["0", "1", "2"] },
      { id: "1_2", name: "Тренировка 3", exerciseIDs: ["0", "1", "2"] },
    ],
  },
  {
    id: "2",
    name: "Базовая3",
    session: [
      { id: "2_1", name: "Тренировка 2", exerciseIDs: ["0", "1", "2"] },
      { id: "2_0", name: "Тренировка 1", exerciseIDs: ["0", "1", "2"] },
      { id: "2_2", name: "Тренировка 3", exerciseIDs: ["0", "1", "2"] },
    ],
  },
];
