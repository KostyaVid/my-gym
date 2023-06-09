import { NavigatorScreenParams } from "@react-navigation/native";

export type State = "pending" | "error" | "done" | null;

export type RootStackParamList = {
  Home: undefined;
  DailyHome: NavigatorScreenParams<DailyStackList>;
  ProgrammsHome: NavigatorScreenParams<ProgrammStackList>;
  ElseHome: NavigatorScreenParams<ElseStackList>;
};

export type ProgrammStackList = {
  Programms: undefined;
  Programm: { programmID: string };
  Training: { programmID: string; trainingID: string };
  Exercise: { exerciseID: string };
};

export type DailyStackList = {
  Daily: undefined;
  Training: { trainingID: string };
  Session: { sessionID: string; trainingID: string };
  ChooseSession: { date: number };
  Exercise: { exerciseID: string; trainingID: string; sessionID: string };
  NewSet: { exerciseID: string; trainingID: string; sessionID: string };
  ChangeSet: {
    exerciseID: string;
    trainingID: string;
    sessionID: string;
    setID: string;
  };
  AddExercise: { trainingID: string; sessionID: string };
  AllResults: { exerciseID: string };
  NewExercise: undefined;
  Dimension: undefined;
};

export type ElseStackList = {
  Else: undefined;
  Settings: undefined;
  Rights: undefined;
};
