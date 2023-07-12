import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable, runInAction } from "mobx";
import { State } from "../types";
import RootStore from "./rootStore.store";
import { ExerciseID } from "../data/exercises";

export type Set = {
  id: string;
  date: number;
  weight: number;
  count: number;
  comment?: string;
};

export type ExerciseSession = {
  sessionID: string;
  sets: Set[];
  isFinish: boolean;
};

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

  getExercise(exerciseID: string) {
    return this.exercises.findLast((item) => item.id === exerciseID);
  }

  getExerciseResult(exerciseID: string, sessionID: string) {
    let exercise = this.getExercise(exerciseID);
    if (!exercise) return;
    return exercise.results.find((result) => result.sessionID === sessionID);
  }
  getSet(exerciseID: string, sessionID: string, setID: string) {
    const resultsInSession = this.getExerciseResult(exerciseID, sessionID);
    if (!resultsInSession) return;
    return resultsInSession.sets.find((localSet) => localSet.id === setID);
  }

  async loadStorage() {
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
    exerciseID: string,
    sessionID: string,
    set: Set
  ) {
    let exercise = this.getExercise(exerciseID);
    if (!exercise) {
      exercise = {
        id: exerciseID,
        results: [],
      };
    }
    exercise.results.push({
      sessionID: sessionID,
      sets: [set],
      isFinish: false,
    });
    this.exercises.push(exercise);

    yield this.saveStore(exerciseID, exercise);
  }

  *addExerciseResultInSession(exerciseID: string, sessionID: string, set: Set) {
    let exercise = this.getExercise(exerciseID);
    if (exercise) {
      if (
        exercise.results[exercise.results.length - 1].sessionID === sessionID
      ) {
        exercise.results[exercise.results.length - 1].sets.push(set);
      } else {
        exercise.results.push({
          sessionID: sessionID,
          sets: [set],
          isFinish: false,
        });
      }
    } else {
      exercise = {
        id: exerciseID,
        results: [],
      };
      exercise.results.push({
        sessionID: sessionID,
        sets: [set],
        isFinish: false,
      });
    }
    yield this.saveStore(exerciseID, exercise);
  }

  *changeExerciseResult(exerciseID: string, sessionID: string, set: Set) {
    let exercise = this.getExercise(exerciseID);
    if (!exercise) return;
    const resultsInSession = exercise.results.find(
      (result) => result.sessionID === sessionID
    );
    if (!resultsInSession) return;
    const setInSessionIndex = resultsInSession.sets.findIndex(
      (localSet) => localSet.id === set.id
    );
    if (setInSessionIndex === -1) return;
    resultsInSession.sets[setInSessionIndex] = set;
    yield this.saveStore(exerciseID, exercise);
  }

  getExerciseSession(exerciseID: string, sessionID: string) {
    let exercise = this.getExercise(exerciseID);

    if (exercise) {
      return exercise.results.find((item) => item.sessionID === sessionID);
    }
  }

  *finishSetsBySessionID(exerciseID: string, sessionID: string) {
    let exercise = this.getExercise(exerciseID);

    if (exercise) {
      const sessionSests = exercise.results.find(
        (item) => item.sessionID === sessionID
      );
      if (sessionSests) {
        sessionSests.isFinish = true;
        yield this.saveStore(exerciseID, exercise);
      }
    }
  }

  *finishSetsLastInTheArray(exerciseID: string) {
    let exercise = this.getExercise(exerciseID);
    if (exercise) {
      const sessionSestsLast = exercise.results[exercise.results.length - 1];
      if (sessionSestsLast) {
        sessionSestsLast.isFinish = true;
        yield this.saveStore(exerciseID, exercise);
      }
    }
  }

  private async saveStore(exerciseID: string, exercise: ExerciseResults) {
    const data = JSON.stringify(exercise);
    if (data) {
      this.state = "pending";
      try {
        await AsyncStorage.setItem("@Result_" + exerciseID, data);
        this.state = "done";
      } catch (error) {
        console.log(error);
        this.state = "error";
      }
    }
  }

  getValueWork(exerciseID: string, sessionID: string, numberSet: number) {
    let exercise = this.getExercise(exerciseID);
    if (exercise) {
      const sessionSests = exercise.results.find(
        (item) => item.sessionID === sessionID
      );
      if (sessionSests) {
        const set = sessionSests.sets[numberSet];
        return set.weight * set.count;
      }
    }
    return 0;
  }

  getValueWorkSetsLastSession(exerciseID: string) {
    let exercise = this.getExercise(exerciseID);
    if (exercise) {
      if (exercise.results.length < 2) return 0;
      const exerciseResult = exercise.results[exercise.results.length - 2].sets;
      return (
        exerciseResult.reduce(
          (prev, curr) => prev + curr.weight * curr.count,
          0
        ) / exerciseResult.length
      ).toFixed(0);
    }
    return 0;
  }

  getValueWorkSetsCurrentSession(exerciseID: string) {
    let exercise = this.getExercise(exerciseID);
    if (exercise) {
      const exerciseResult = exercise.results[exercise.results.length - 1].sets;
      return (
        exerciseResult.reduce(
          (prev, curr) => prev + curr.weight * curr.count,
          0
        ) / exerciseResult.length
      ).toFixed(0);
    }
    return 0;
  }
}
