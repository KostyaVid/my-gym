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
  Session: { trainingID: string };
  Dimension: undefined;
};
