import { SectionList, StyleSheet, View } from "react-native";
import React from "react";
import { programmsData } from "../../../data/programms";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import { useStore } from "../../../store/rootStore.store";
import globalStyle from "../../../utils/styles";
import Container from "../../../components/Container/Container";
import { Button, Text, TouchableRipple } from "react-native-paper";

type ProgrammsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ProgrammsHome"
>;

type Props = {
  navigation: ProgrammsScreenNavigationProp;
};

const data = programmsData.map((elem) => {
  return {
    title: elem.name,
    id: elem.id,
    data: elem.trainings,
    description: elem.description,
  };
});

const Programms = ({ navigation }: Props) => {
  const currentProgramm = useStore().currentProgramm;
  return (
    <Container style={globalStyle.container}>
      <Text variant="headlineMedium">Выберите программу:</Text>
      <SectionList
        style={styles.sectionList}
        sections={data}
        renderItem={({ item, section }) => (
          <TouchableRipple
            style={styles.training}
            onPress={() => {
              navigation.navigate("ProgrammsHome", {
                screen: "Training",
                params: { trainingID: item.id, programmID: section.id },
              });
            }}
          >
            <Text>{item.name}</Text>
          </TouchableRipple>
        )}
        renderSectionHeader={({ section }) => (
          <View>
            <View style={styles.sectionHeader}>
              <TouchableRipple
                style={styles.nameProgramm}
                onPress={() => {
                  navigation.navigate("ProgrammsHome", {
                    screen: "Programm",
                    params: { programmID: section.id },
                  });
                }}
              >
                <Text variant="headlineSmall">{section.title}</Text>
              </TouchableRipple>
              <Button
                mode="contained-tonal"
                icon="arrow-collapse-left"
                onPress={() => {
                  currentProgramm?.setProgrammByID(section.id);
                  navigation.navigate("DailyHome", { screen: "Daily" });
                }}
              >
                Начать
              </Button>
            </View>
            {section.description && (
              <Text style={styles.description}>{section.description}</Text>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
};

export default Programms;

const styles = StyleSheet.create({
  sectionList: {
    marginTop: 10,
  },
  training: {
    paddingTop: 6,
    paddingBottom: 6,
  },
  sectionHeader: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#444",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameProgramm: {
    marginBottom: 10,
  },
  description: {
    marginTop: 10,
  },
});
