import React from "react";
import { makeAutoObservable } from "mobx";
import { ProgrammDataProps } from "../data/programms";
import { programmsData } from "../data/programms";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { State } from "../types";
import RootStore from "./rootStore.store";

export default class CurrentProgrammStore {
  currentProgramm: ProgrammDataProps | null = null;
  state: State = null;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setProgrammByID(programmID: string) {
    const programm = programmsData.find((elem) => elem.id === programmID);
    if (programm) {
      this.currentProgramm = programm;
    } else {
      console.log("Error: Programm with id:", programmID, "not found");
    }
  }

  *addExerciseInTheProgramm(
    sessionID: string,
    exerceseID: string,
    position?: number
  ) {
    if (!this.currentProgramm) return;

    const session = this.currentProgramm?.session.find(
      (item) => item.id === sessionID
    );
    if (!session) return;

    if (position === undefined) {
      session.exerciseIDs.push(exerceseID);
    } else {
      session.exerciseIDs = [
        ...session.exerciseIDs.slice(0, position - 1),
        exerceseID,
        ...session.exerciseIDs.slice(position),
      ];
    }
    this.state = "pending";
    yield this.saveStore();
    this.state = "done";
  }

  *deleteExerciseInTheProgramm(sessionID: string, exerceseID: string) {
    if (!this.currentProgramm) return;
    const session = this.currentProgramm?.session.find(
      (item) => item.id === sessionID
    );
    if (!session) return;

    session.exerciseIDs = session.exerciseIDs.filter((id) => id !== exerceseID);
    this.state = "pending";
    yield this.saveStore();
    this.state = "done";
  }

  *deleteSessionInTheProgramm(sessionID: string) {
    if (!this.currentProgramm) return;
    this.state = "pending";
    this.currentProgramm.session = this.currentProgramm.session.filter(
      ({ id }) => id !== sessionID
    );
    yield this.saveStore();
    this.state = "done";
  }

  *programmAsyncStorage() {
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

  async saveStore() {
    try {
      await AsyncStorage.setItem(
        "@CurrentProgramm",
        JSON.stringify(this.currentProgramm)
      );
    } catch (error) {
      console.log(error);
    }
  }
}
