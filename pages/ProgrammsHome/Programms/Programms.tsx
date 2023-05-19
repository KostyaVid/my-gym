import {
  Button,
  SectionList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import { programmsData } from "../../../data/programms";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import { useStore } from "../../../store/rootStore.store";
import P from "../../../components/P/P";

type ProgrammsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ProgrammsHome"
>;

type Props = {
  navigation: ProgrammsScreenNavigationProp;
};

const data = programmsData.map((elem) => {
  return { title: elem.name, id: elem.id, data: elem.trainings };
});

const Programms = ({ navigation }: Props) => {
  const currentProgramm = useStore().currentProgramm;
  return (
    <View>
      <P>Programms:</P>
      <SectionList
        sections={data}
        renderItem={({ item }) => (
          <TouchableHighlight
            activeOpacity={0.6}
            onPress={() => {
              navigation.navigate("ProgrammsHome", {
                screen: "Session",
                params: { id: item.id },
              });
            }}
          >
            <P>{item.name}</P>
          </TouchableHighlight>
        )}
        renderSectionHeader={({ section }) => (
          <View>
            <TouchableHighlight
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate("ProgrammsHome", {
                  screen: "Programm",
                  params: { id: section.id },
                });
              }}
            >
              <P>{section.title}</P>
            </TouchableHighlight>
            <Button
              title="Применить"
              onPress={() => {
                currentProgramm?.setProgrammByID(section.id);
                navigation.navigate("DailyHome", { screen: "Daily" });
              }}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Programms;

const styles = StyleSheet.create({});
