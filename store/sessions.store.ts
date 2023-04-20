import { computed, makeAutoObservable } from "mobx";
import RootStore from "./rootStore.store";
import { State } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Session = {
  sessionID: string;
  programmID: string;
  dateStart: number;
  dateEnd: number;
};

export type Sessions = Session[];

export default class SessionStore {
  rootStore: RootStore;
  sessions: Sessions = [];
  state: State = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { getSession: computed });
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

  *addSession(session: Session) {}

  getSession(sessionID: string) {
    return this.sessions.find((item) => item.sessionID === sessionID);
  }
}
