import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import React, { useCallback } from "react";
import P from "../P/P";
import Container from "../Container/Container";
import { observer } from "mobx-react-lite";
import { useTheme } from "@react-navigation/native";
import IncButton from "../Buttons/IncButton/IncButton";

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
    const { colors } = useTheme();

    const inputStyle: StyleProp<TextStyle> = [
      styles.input,
      {
        borderColor: colors.border,
        color: colors.text,
        backgroundColor: danger ? colors.notification : colors.background,
      },
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

    const handleInc = useCallback(() => {
      setValue((value) => inc(value));
    }, [setValue]);

    const handleDec = useCallback(() => {
      setValue((value) => dec(value));
    }, [setValue]);

    return (
      <Container style={styles.container}>
        <P size="h2" weight="600">
          {title}
        </P>
        <View style={styles.containerButtons}>
          <IncButton type="decrement" onPress={handleDec} />
          <TextInput
            style={inputStyle}
            keyboardType="numeric"
            value={value}
            onChangeText={handleValue}
            maxLength={8}
          />
          <IncButton type="increment" onPress={handleInc} />
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
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
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
