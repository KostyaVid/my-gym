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
    yield this.saveStore();
  }

  *deleteExerciseInTheProgramm(sessionID: string, exerceseID: string) {
    if (!this.currentProgramm) return;
    const session = this.currentProgramm?.session.find(
      (item) => item.id === sessionID
    );
    if (!session) return;

    session.exerciseIDs = session.exerciseIDs.filter((id) => id !== exerceseID);
    yield this.saveStore();
  }

  *deleteSessionInTheProgramm(sessionID: string) {
    if (!this.currentProgramm) return;
    this.currentProgramm.session = this.currentProgramm.session.filter(
      ({ id }) => id !== sessionID
    );
    yield this.saveStore();
  }

  *loadCurrentProgramm() {
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

  // *addNewSession(sessionID: string) {
  //   this.currentProgramm?.session.push();
  // }

  *startSession(sessionID: string) {
    if (this.currentProgramm) {
      const session: Session = {
        sessionID: sessionID,
        programmID: this.currentProgramm?.id,
        dateStart: Date.now(),
      };
      this.rootStore.sessions.addSession(session);
      this.currentSessionID = sessionID;
      yield this.saveStore();
    } else {
      console.log("there is not current programm");
    }
  }

  *endCurrentSession() {
    if (this.currentSessionID) {
      this.rootStore.sessions.setEndDateSession(this.currentSessionID);
      this.currentSessionID = null;
      yield this.saveStore();
    }
  }

  async saveStore() {
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
