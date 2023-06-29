import {
  SectionList,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import { programmsData } from "../../../data/programms";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import { useStore } from "../../../store/rootStore.store";
import P from "../../../components/P/P";
import globalStyle from "../../../utils/styles";
import BasicButton from "../../../components/Buttons/BasicButton/BasicButton";
import Container from "../../../components/Container/Container";

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
      <P size="h1">Выберите программу:</P>
      <SectionList
        style={styles.sectionList}
        sections={data}
        renderItem={({ item, section }) => (
          <TouchableHighlight
            style={styles.training}
            activeOpacity={0.6}
            onPress={() => {
              navigation.navigate("ProgrammsHome", {
                screen: "Training",
                params: { trainingID: item.id, programmID: section.id },
              });
            }}
          >
            <P>{item.name}</P>
          </TouchableHighlight>
        )}
        renderSectionHeader={({ section }) => (
          <View>
            <View style={styles.sectionHeader}>
              <TouchableHighlight
                style={styles.nameProgramm}
                activeOpacity={0.6}
                onPress={() => {
                  navigation.navigate("ProgrammsHome", {
                    screen: "Programm",
                    params: { programmID: section.id },
                  });
                }}
              >
                <P size="h2">{section.title}</P>
              </TouchableHighlight>
              <BasicButton
                title="Начать"
                onPress={() => {
                  currentProgramm?.setProgrammByID(section.id);
                  navigation.navigate("DailyHome", { screen: "Daily" });
                }}
              />
            </View>
            {section.description && (
              <P disable style={styles.description}>
                {section.description}
              </P>
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
  },
  nameProgramm: {
    marginBottom: 10,
  },
  description: {
    marginTop: 10,
  },
});
