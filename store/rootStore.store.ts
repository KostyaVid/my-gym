import { createContext, useContext } from "react";
import CurrentProgrammStore from "./currentProgramm.store";
import CustomExercisesStore from "./customExercises.store";
import ExerciseStore from "./exercise.store";
import SessionStore from "./sessions.store";

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
    this.currentProgramm.loadCurrentProgramm();
    this.customExercises.loadCustomExercises();
    this.exercisesResults.loadExerciseStore();
    this.sessions.loadSessionStorage();
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
