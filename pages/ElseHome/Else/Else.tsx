import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import globalStyle from "../../../utils/styles";
import { Button, Divider } from "react-native-paper";
import Container from "../../../components/Container/Container";

type ElseNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ElseHome"
>;

type Props = {
  navigation: ElseNavigationProp;
};

const Else: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={globalStyle.container}>
      <Container style={styles.container}>
        <Button
          onPress={() => {
            navigation.navigate("ElseHome", { screen: "Settings" });
          }}
        >
          Настройки
        </Button>
        <Divider />
      </Container>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { marginTop: 20 },
});

export default Else;
