import type { ProgrammProps } from "../components/ProgrammC/ProgrammC";
import type { SessionProps } from "../components/SessionC/SessionC";

export type SessionDataProps = SessionProps & { exerciseIDs: string[] };
export type ProgrammDataProps = ProgrammProps & { session: SessionDataProps[] };
export const programmsData: ProgrammDataProps[] = [
  {
    id: "0",
    name: "Базовая1",
    session: [
      { id: "s0_0", name: "Тренировка 1", exerciseIDs: ["e0", "e1", "e2"] },
      { id: "s0_1", name: "Тренировка 2", exerciseIDs: ["e2", "e3"] },
      { id: "s0_2", name: "Тренировка 3", exerciseIDs: ["e0", "e2"] },
    ],
  },
  {
    id: "1",
    name: "Базовая2",
    session: [
      { id: "s1_0", name: "Тренировка 1", exerciseIDs: ["e0", "e1", "e2"] },
      { id: "s1_1", name: "Тренировка 2", exerciseIDs: ["e0", "e1", "e2"] },
      { id: "s1_2", name: "Тренировка 3", exerciseIDs: ["e0", "e1", "e2"] },
    ],
  },
  {
    id: "2",
    name: "Базовая3",
    session: [
      { id: "s2_1", name: "Тренировка 2", exerciseIDs: ["e0", "e1", "e2"] },
      { id: "s2_0", name: "Тренировка 1", exerciseIDs: ["e0", "e1", "e2"] },
      { id: "s2_2", name: "Тренировка 3", exerciseIDs: ["e0", "e1", "e2"] },
    ],
  },
];
