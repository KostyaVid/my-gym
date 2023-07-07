import { StyleSheet, TextInput } from "react-native";
import React from "react";
import Container from "../Container/Container";
import { useTheme } from "@react-navigation/native";
import { Text } from "react-native-paper";

type InputCommentProps = {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
};

const InputComment: React.FC<InputCommentProps> = ({
  title,
  value,
  setValue,
  placeholder,
}) => {
  const { colors } = useTheme();
  return (
    <Container>
      <Text variant="headlineSmall">{title}</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        multiline
        placeholder={placeholder}
        style={[
          styles.input,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
            color: colors.text,
          },
        ]}
        placeholderTextColor={colors.text}
      />
    </Container>
  );
};

export default InputComment;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
});
