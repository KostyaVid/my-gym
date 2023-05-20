import { View, StyleSheet, Switch } from "react-native";
import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import P from "../../../components/P/P";
import globalStyle from "../../../utils/styles";

const Settings = observer(() => {
  const store = useStore();

  const toggleMyScheme = (value: boolean) => {
    store.theme.setScheme(value ? "light" : "default");
  };

  const toggleScheme = (value: boolean) => {
    store.theme.setScheme(value ? "dark" : "light");
  };

  const myScheme = store.theme.scheme === "default" ? false : true;
  const scheme = store.theme.scheme === "dark" ? true : false;

  return (
    <View style={globalStyle.container}>
      <View>
        <P>Цветовая тема:</P>
        <View style={style.line}>
          <P>Тема устройства</P>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            value={myScheme}
            onValueChange={toggleMyScheme}
          />
          <P>Своя</P>
        </View>
        {myScheme && (
          <View style={style.line}>
            <P>Светлая</P>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              value={scheme}
              onValueChange={toggleScheme}
            />
            <P>Темная</P>
          </View>
        )}
      </View>
    </View>
  );
});

const style = StyleSheet.create({
  line: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});

export default Settings;
