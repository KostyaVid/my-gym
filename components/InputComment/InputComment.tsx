import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import P from "../P/P";
import Container from "../Container/Container";
import { useTheme } from "@react-navigation/native";

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
      <P size="h3">{title}</P>
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
