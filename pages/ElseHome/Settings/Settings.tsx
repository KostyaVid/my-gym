import { View, StyleSheet, Text, Switch } from "react-native";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";

const Settings = observer(() => {
  const [myScheme, setMyScheme] = useState(false);
  const toggleMyScheme = () => setMyScheme((previousState) => !previousState);

  const [scheme, setScheme] = useState(false);
  const toggleScheme = () => setScheme((previousState) => !previousState);

  const store = useStore();

  return (
    <View style={style.container}>
      <View>
        <Text>Цветовая тема:</Text>
        <View style={style.line}>
          <Text>Тема устройства</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            value={myScheme}
            onValueChange={toggleMyScheme}
          />
          <Text>Своя</Text>
        </View>
        {myScheme && (
          <View style={style.line}>
            <Text>Светлая</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              value={scheme}
              onValueChange={toggleScheme}
            />
            <Text>Темная</Text>
          </View>
        )}
      </View>
    </View>
  );
});

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});

export default Settings;
