import { ExerciseID } from "./../components/Exercise/Exercise";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable, runInAction } from "mobx";
import { State } from "../types";
import RootStore from "./rootStore.store";

export type Set = {
  date: number;
  weight: number;
  count: number;
};

export type ExerciseSession = { sessionID: number; sets: Set[] };

export type ExerciseResults = ExerciseID & {
  results: ExerciseSession[];
};

export default class ExerciseStore {
  rootStore: RootStore;
  exercises: ExerciseResults[] = [];
  state: State = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async loadExerciseStore() {
    this.state = "pending";

    try {
      const keysAsyncStorage: readonly string[] =
        await AsyncStorage.getAllKeys();
      const keysExercises = keysAsyncStorage.filter(
        (key) => key.slice(0, 7) === "@Result"
      );
      const outResults: ExerciseResults[] = [];

      for (const key of keysExercises) {
        const res: string | null = await AsyncStorage.getItem(key);
        if (res) {
          const data: ExerciseResults = JSON.parse(res);
          if (data) {
            outResults.push(data);
          }
        }
      }
      runInAction(() => {
        this.exercises = outResults;
        this.state = "done";
      });
    } catch (error) {
      runInAction(() => {
        this.state = "error";
      });
    }
  }

  *addFirstExerciseResultInSession(
    exersiseID: string,
    sessionID: number,
    set: Set
  ) {
    let exercise = this.exercises.find(({ id }) => id === exersiseID);
    if (!exercise) {
      exercise = {
        id: exersiseID,
        results: [],
      };
    }
    exercise.results.push({ sessionID: sessionID, sets: [set] });
    this.state = "pending";
    const data = JSON.stringify(exercise);
    try {
      yield AsyncStorage.setItem("@Result_" + exersiseID, data);
      this.state = "done";
    } catch (error) {
      console.log(error);
      this.state = "error";
    }
  }

  *addExerciseResultInSession(exersiseID: string, sessionID: number, set: Set) {
    let exercise = this.exercises.find(({ id }) => id === exersiseID);
    if (exercise) {
      exercise.results[exercise.results.length - 1].sets.push(set);
      this.state = "pending";
      const data = JSON.stringify(exercise);
      try {
        yield AsyncStorage.setItem("@Result_" + exersiseID, data);
        this.state = "done";
      } catch (error) {
        console.log(error);
        this.state = "error";
      }
    } else {
      exercise = {
        id: exersiseID,
        results: [],
      };
      exercise.results.push({ sessionID: sessionID, sets: [set] });
      this.state = "pending";
      const data = JSON.stringify(exercise);
      try {
        yield AsyncStorage.setItem("@Result_" + exersiseID, data);
        this.state = "done";
      } catch (error) {
        console.log(error);
        this.state = "error";
      }
    }
  }
}
