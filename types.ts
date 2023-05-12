import { NavigatorScreenParams } from "@react-navigation/native";

export type State = "pending" | "error" | "done" | null;

export type RootStackParamList = {
  Home: undefined;
  DailyHome: NavigatorScreenParams<DailyStackList>;
  ProgrammsHome: NavigatorScreenParams<ProgrammStackList>;
  Else: undefined;
};

export type ProgrammStackList = {
  Programms: undefined;
  Programm: { id: string };
  Session: { id: string };
};

export type DailyStackList = {
  Daily: undefined;
  Training: { trainingID: string };
  Session: { sessionID: string; trainingID: string };
  ChooseSession: { date: number };
  Exercise: { exerciseID: string; trainingID: string; sessionID: string };
  NewSet: { exerciseID: string; trainingID: string; sessionID: string };
  AddExercise: { trainingID: string; sessionID: string };
  Dimension: undefined;
};
