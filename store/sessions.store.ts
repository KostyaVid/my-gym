import { makeAutoObservable } from "mobx";
import RootStore from "./rootStore.store";
import { State } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Session = {
  sessionID: string;
  programmID: string;
  trainingID: string;
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

  getPrevSessionIDByCurrentSessionID(sessionID: string) {
    for (let i = this.sessions.length - 1; i > 0; i--) {
      if (this.sessions[i].sessionID === sessionID)
        return this.sessions[i - 1].sessionID;
    }
  }

  *loadStorage() {
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
    yield this.saveStore();
  }

  *setEndDateSession(sessionID: string) {
    const session = this.sessions.findLast(
      (item) => item.sessionID === sessionID
    );
    if (session) {
      session.dateEnd = Date.now();
      yield this.saveStore();
    } else {
      console.log("Session ID:", sessionID, "is not found");
    }
  }

  *finishLastSession() {
    this.sessions[this.sessions.length - 1].dateEnd = Date.now();
    yield this.saveStore();
  }

  getSession(sessionID: string) {
    return this.sessions.find((item) => item.sessionID === sessionID);
  }

  private async saveStore() {
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
