import { StyleProp, StyleSheet, TextInput, TextStyle } from "react-native";
import React, { useCallback } from "react";
import P from "../P/P";
import Container from "../Container/Container";
import { observer } from "mobx-react-lite";
import { useTheme } from "@react-navigation/native";

type InputNumberProps = {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isInteger?: boolean;
};

const buttonsValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

const InputNumber: React.FC<InputNumberProps> = observer(
  ({ title, value, setValue, isInteger = false }) => {
    const { colors } = useTheme();
    const inputStyle: StyleProp<TextStyle> = [
      styles.input,
      { borderColor: colors.border, color: colors.text },
    ];

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
    return (
      <Container style={styles.container}>
        <P style={styles.title}>{title}</P>
        <TextInput
          style={inputStyle}
          keyboardType="numeric"
          value={value}
          onChangeText={handleValue}
          maxLength={8}
        />
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
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
    textAlign: "center",
    fontSize: 30,
  },
  title: {},
});
