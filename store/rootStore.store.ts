import { createContext, useContext } from "react";
import CurrentProgrammStore from "./currentProgramm.store";
import CustomExercisesStore from "./customExercises.store";
import ExerciseStore from "./exercise.store";
import SessionStore from "./sessions.store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { exerciseData } from "../data/exercises";

export default class RootStore {
  currentProgramm: CurrentProgrammStore;
  customExercises: CustomExercisesStore;
  exercisesResults: ExerciseStore;
  sessions: SessionStore;
  constructor() {
    this.currentProgramm = new CurrentProgrammStore(this);
    this.customExercises = new CustomExercisesStore();
    this.exercisesResults = new ExerciseStore(this);
    this.sessions = new SessionStore(this);
    this.init();
  }
  async init() {
    if (__DEV__) await AsyncStorage.clear();
    this.currentProgramm.loadCurrentProgramm();
    this.customExercises.loadCustomExercises();
    this.exercisesResults.loadExerciseStore();
    this.sessions.loadSessionStorage();
  }

  getExercise(exerciseID: string) {
    let exercise = exerciseData.find((item) => item.id === exerciseID);
    if (!exercise) exercise = this.customExercises.getExercise(exerciseID);
    return exercise;
  }
}

export const RootStoreContext = createContext<RootStore | null>(null);

export const useStore = () => {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Doesn't component use observer. Use observer HOC");
  }
  return store;
};

export const rootStore = new RootStore();
