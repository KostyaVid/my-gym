import React from "react";
import { makeAutoObservable } from "mobx";
import { ProgrammDataProps } from "../data/programms";
import { programmsData } from "../data/programms";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { State } from "../types";
import RootStore from "./rootStore.store";
import { Session } from "./sessions.store";

export default class CurrentProgrammStore {
  currentProgramm: ProgrammDataProps | null = null;
  currentSessionID: string | null = null;
  currentTrainingID: string | null = null;
  state: State = null;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  getTraining(trainingID: string) {
    return this.currentProgramm?.trainings.find(
      (item) => item.id === trainingID
    );
  }

  setProgrammByID(programmID: string) {
    const programm = programmsData.find((elem) => elem.id === programmID);
    if (programm) {
      this.currentProgramm = programm;
    } else {
      console.log("Error: Programm with id:", programmID, "not found");
    }
  }

  /**
   *
   * @param exerciseID exercise id
   * @param newIndex new position in the array
   * @param trainingID current training (default) or training id
   * @returns panding save if all is ok
   */

  *changeOrderExerciseOne(
    exerciseID: string,
    newIndex: number,
    trainingID?: string | null
  ) {
    if (!this.currentProgramm) return;
    if (!trainingID) {
      if (!this.currentTrainingID) return;
      trainingID = this.currentTrainingID;
    }
    const training = this.currentProgramm.trainings.find(
      (training) => training.id === trainingID
    );
    if (!training) return;
    const exercises = training.exerciseIDs;
    const oldIndex = exercises.findIndex((exercise) => exercise === exerciseID);
    const temp = exercises[newIndex];
    if (oldIndex === undefined || temp === undefined) return;
    exercises[newIndex] = exercises[oldIndex];
    exercises[oldIndex] = temp;
    yield this.saveStore();
  }

  *rewriteExerciseWithTraining(
    exercises: string[],
    trainingID?: string | null
  ) {
    if (!this.currentProgramm) return;
    if (!trainingID) {
      if (!this.currentTrainingID) return;
      trainingID = this.currentTrainingID;
    }
    const training = this.currentProgramm.trainings.find(
      (training) => training.id === trainingID
    );
    if (!training) return;
    training.exerciseIDs = exercises;
    yield this.saveStore();
  }

  *addExerciseInTheProgramm(
    trainingID: string,
    exerciseID: string,
    position?: number
  ) {
    if (!this.currentProgramm) return;

    const session = this.currentProgramm?.trainings.find(
      (item) => item.id === trainingID
    );
    if (!session) return;

    if (position === undefined) {
      session.exerciseIDs.push(exerciseID);
    } else {
      session.exerciseIDs = [
        ...session.exerciseIDs.slice(0, position - 1),
        exerciseID,
        ...session.exerciseIDs.slice(position),
      ];
    }
    yield this.saveStore();
  }

  *addExerciseInTheCurrentProgramm(exerciseID: string, position?: number) {
    if (!this.currentProgramm) return;

    const training = this.currentProgramm?.trainings.find(
      (item) => item.id === this.currentTrainingID
    );
    if (!training) return;

    if (position === undefined) {
      training.exerciseIDs.push(exerciseID);
    } else {
      training.exerciseIDs = [
        ...training.exerciseIDs.slice(0, position - 1),
        exerciseID,
        ...training.exerciseIDs.slice(position),
      ];
    }
    yield this.saveStore();
  }

  *deleteExerciseInTheProgramm(trainingID: string, exerciseID: string) {
    if (!this.currentProgramm) return;
    const session = this.currentProgramm?.trainings.find(
      (item) => item.id === trainingID
    );
    if (!session) return;

    session.exerciseIDs = session.exerciseIDs.filter((id) => id !== exerciseID);
    yield this.saveStore();
  }

  *deleteTrainingInTheProgramm(trainingID: string) {
    if (!this.currentProgramm) return;
    this.currentProgramm.trainings = this.currentProgramm.trainings.filter(
      ({ id }) => id !== trainingID
    );
    yield this.saveStore();
  }

  *loadStorage() {
    this.state = "pending";
    try {
      const data: string | null = yield AsyncStorage.getItem(
        "@CurrentProgramm"
      );
      if (data) {
        this.currentProgramm = JSON.parse(data);
        this.state = "done";
      } else {
        this.state = "error";
      }
    } catch (error) {
      this.state = "error";
    }
  }

  createSessionID = () => {
    let lastSessionID = this.rootStore.sessions.sessions.findLast(
      (item) => item.programmID === this.currentProgramm?.id
    )?.sessionID;
    if (!lastSessionID) lastSessionID = "s" + this.currentProgramm?.id + "_0";

    return (
      lastSessionID.split("_")[0] +
      "_" +
      (Number(lastSessionID.split("_")[1]) + 1).toString()
    );
  };

  *startSession(trainingID: string) {
    if (this.currentProgramm) {
      const sessionID = this.createSessionID();
      const session: Session = {
        sessionID: sessionID,
        trainingID,
        programmID: this.currentProgramm?.id,
        dateStart: Date.now(),
      };
      this.rootStore.sessions.addSession(session);
      this.currentSessionID = sessionID;
      this.currentTrainingID = trainingID;
      this.saveStore();
    } else {
      console.log("there is not current programm");
    }
  }

  *endCurrentSession() {
    if (this.currentSessionID) {
      this.rootStore.sessions.setEndDateSession(this.currentSessionID);
      this.currentSessionID = null;
      this.currentTrainingID = null;
      yield this.saveStore();
    }
  }

  private async saveStore() {
    this.state = "pending";
    try {
      await AsyncStorage.setItem(
        "@CurrentProgramm",
        JSON.stringify(this.currentProgramm)
      );
      this.state = "done";
    } catch (error) {
      this.state = "error";
      console.log(error);
    }
  }
}
