import { computed, makeAutoObservable } from "mobx";
import RootStore from "./rootStore.store";
import { State } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Session = {
  sessionID: string;
  programmID: string;
  dateStart: number;
  dateEnd?: number;
};

export type Sessions = Session[];

export default class SessionStore {
  rootStore: RootStore;
  sessions: Sessions = [];
  state: State = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  *loadSessionStorage() {
    this.state = "pending";
    try {
      const res: string | null = yield AsyncStorage.getItem("@Sessions");
      if (res) {
        const data = JSON.parse(res);
        if (data) {
          this.sessions = data;
        }
      }
      this.state = "done";
    } catch (error) {
      console.log(error);
      this.state = "error";
    }
  }

  *addSession(session: Session) {
    this.sessions.push(session);
    yield this.saveSAsyncStore();
  }

  *finishLastSession() {
    this.sessions[this.sessions.length - 1].dateEnd = Date.now();
    yield this.saveSAsyncStore();
  }

  getSession(sessionID: string) {
    return this.sessions.find((item) => item.sessionID === sessionID);
  }

  async saveSAsyncStore() {
    try {
      this.state = "pending";
      await AsyncStorage.setItem("@Sessions", JSON.stringify(this.sessions));
      this.state = "done";
    } catch (error) {
      console.log(error);
      this.state = "error";
    }
  }
}
