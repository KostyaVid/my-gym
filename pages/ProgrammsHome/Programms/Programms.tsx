import { SafeAreaView, SectionList, StyleSheet, View } from "react-native";
import React from "react";
import { programmsData } from "../../../data/programms";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import { useStore } from "../../../store/rootStore.store";
import globalStyle from "../../../utils/styles";
import Container from "../../../components/Container/Container";
import { Button, Surface, Text, TouchableRipple } from "react-native-paper";

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
    <SafeAreaView style={globalStyle.container}>
      <Container>
        <Text variant="headlineMedium">Выберите программу:</Text>
      </Container>
      <SectionList
        style={styles.sectionList}
        sections={data}
        renderItem={({ item, section, index }) => (
          <TouchableRipple
            style={[styles.training, globalStyle.padding10]}
            onPress={() => {
              navigation.navigate("ProgrammsHome", {
                screen: "Training",
                params: { trainingID: item.id, programmID: section.id },
              });
            }}
          >
            <Text>{index + 1 + ". " + item.name}</Text>
          </TouchableRipple>
        )}
        renderSectionHeader={({ section }) => (
          <View>
            <Surface style={[styles.sectionHeader, globalStyle.padding10]}>
              <TouchableRipple
                style={styles.nameProgramm}
                onPress={() => {
                  navigation.navigate("ProgrammsHome", {
                    screen: "Programm",
                    params: { programmID: section.id },
                  });
                }}
              >
                <Text variant="titleLarge">{section.title}</Text>
              </TouchableRipple>
              <Button
                mode="outlined"
                icon="arrow-collapse-left"
                onPress={() => {
                  currentProgramm?.setProgrammByID(section.id);
                  navigation.navigate("DailyHome", { screen: "Daily" });
                }}
              >
                Начать
              </Button>
            </Surface>
            {section.description && (
              <Text style={[styles.description, globalStyle.padding10]}>
                {section.description}
              </Text>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
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
    borderTopWidth: 1,
    borderColor: "#444",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  nameProgramm: {
    marginBottom: 10,
    flexShrink: 1,
  },
  description: {
    opacity: 0.6,
  },
});
