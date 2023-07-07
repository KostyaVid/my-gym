import { View, StyleSheet, ColorSchemeName } from "react-native";
import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import globalStyle from "../../../utils/styles";
import { RadioButton, Text } from "react-native-paper";
import Container from "../../../components/Container/Container";

const Settings = observer(() => {
  const store = useStore();
  const handleChange = (value: string) => {
    store.theme.setScheme(value as "default" | ColorSchemeName);
  };

  return (
    <View style={globalStyle.container}>
      <Container>
        <Text variant="headlineSmall" style={style.RadioContainer}>
          Цветовая тема:
        </Text>
        <RadioButton.Group
          onValueChange={handleChange}
          value={`${store.theme.scheme}`}
        >
          <RadioButton.Item label="Тема устройства" value="default" />
          <RadioButton.Item label="Светлая" value="light" />
          <RadioButton.Item label="Темная" value="dark" />
        </RadioButton.Group>
      </Container>
    </View>
  );
});

const style = StyleSheet.create({
  RadioContainer: {
    marginBottom: 20,
  },
});

export default Settings;
