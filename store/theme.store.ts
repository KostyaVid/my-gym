import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable } from "mobx";
import { ColorSchemeName } from "react-native";

export default class ThemeStore {
  scheme: ColorSchemeName | "default" = "default";
  constructor() {
    makeAutoObservable(this);
  }

  setScheme(scheme: ColorSchemeName | "default") {
    this.scheme = scheme;
    this.saveStore();
  }

  *loadStorage() {
    try {
      const res: string | null = yield AsyncStorage.getItem("@Scheme");
      if (res) {
        const data = JSON.parse(res);
        if (data) {
          this.scheme = data;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async saveStore() {
    try {
      await AsyncStorage.setItem("@Scheme", JSON.stringify(this.scheme));
    } catch (error) {
      console.log(error);
    }
  }
}
