import { makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExerciseFullProps, Muscle, exerciseData } from "../data/exercises";
import { State } from "../types";

export default class CustomExerciseStore {
  exercises: ExerciseFullProps[] = [];
  state: State = null;
  constructor() {
    makeAutoObservable(this);
  }

  get getAllExercisesData() {
    return exerciseData.concat(this.exercises);
  }

  get getAllExercisesSorted() {
    return this.getAllExercisesData.sort((a, b) =>
      b.mainMuscle.localeCompare(a.mainMuscle)
    );
  }

  getAllExerciseDataFilter(muscle: Muscle) {
    return this.getAllExercisesData.filter(
      (item) => item.mainMuscle === muscle
    );
  }

  getExercise = (exerciseID: string) => {
    return this.exercises.find((item) => item.id === exerciseID);
  };

  *loadStorage() {
    this.state = "pending";
    try {
      const data: string | null = yield AsyncStorage.getItem(
        "@CustomExercises"
      );
      this.exercises = data ? JSON.parse(data) : [];
      this.state = "done";
    } catch (error) {
      console.log(error);
      this.state = "error";
    }
  }

  *addCustomExercise(exercise: ExerciseFullProps) {
    this.state = "pending";
    const predicat = ({ id }: ExerciseFullProps) => id === exercise.id;

    if (exercise.id === "") {
      exercise.id = "c" + Date.now().toString();
    } else {
      if (
        this.exercises.findIndex(predicat) !== -1 ||
        exerciseData.findIndex(predicat) !== -1
      ) {
        console.log("ID has been exist");
        this.state = "done";
        return;
      }
    }

    if (!exercise.custom) exercise.custom = true;

    this.exercises.push(exercise);
    yield this.saveStore();
  }

  *deleteCustomExerciseByID(exerciseID: string) {
    this.state = "pending";
    this.exercises = this.exercises.filter(({ id }) => id !== exerciseID);
    yield this.saveStore();
    this.state = "done";
  }

  private async saveStore() {
    try {
      await AsyncStorage.setItem(
        "@CustomExercises",
        JSON.stringify(this.exercises)
      );
    } catch (error) {
      console.log(error);
    }
  }
}
