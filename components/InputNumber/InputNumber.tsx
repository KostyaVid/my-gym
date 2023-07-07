import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import React, { useCallback } from "react";
import Container from "../Container/Container";
import { observer } from "mobx-react-lite";
import { useTheme } from "@react-navigation/native";
import { IconButton, Text, TextInput } from "react-native-paper";

type InputNumberProps = {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isInteger?: boolean;
  danger?: boolean;
};

const buttonsValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

const inc = (text: string) => {
  const number = parseInt(text);
  if (isNaN(number)) return text;
  return (number + 1).toString();
};
const dec = (text: string) => {
  const number = parseInt(text);
  if (isNaN(number) || number - 1 < 0) return text;
  return (number - 1).toString();
};

const InputNumber: React.FC<InputNumberProps> = observer(
  ({ title, value, setValue, isInteger = false, danger = false }) => {
    const handleValue = useCallback(
      (text: string) => {
        if (!text.length) setValue("");
        const lastChar = text.at(-1);
        if (!buttonsValues.find((digit) => digit === lastChar)) return;
        if (isInteger && lastChar === ".") return;
        if (isNaN(Number(text))) return;
        setValue(text);
      },
      [setValue, isInteger]
    );

    const handleInc = useCallback(() => {
      setValue((value) => inc(value));
    }, [setValue]);

    const handleDec = useCallback(() => {
      setValue((value) => dec(value));
    }, [setValue]);

    return (
      <Container style={styles.container}>
        <Text variant="headlineLarge">{title}</Text>
        <View style={styles.containerButtons}>
          <IconButton mode="contained-tonal" icon="minus" onPress={handleDec} />
          <TextInput
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
            value={value}
            onChangeText={handleValue}
            maxLength={8}
            error={danger}
          />
          <IconButton mode="contained-tonal" icon="plus" onPress={handleInc} />
        </View>
      </Container>
    );
  }
);

export default InputNumber;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  input: {
    padding: 5,
    textAlign: "center",
    fontSize: 30,
  },
  containerButtons: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
