import {
  Button,
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
    <View style={globalStyle.container}>
      <P>Programms:</P>
      <SectionList
        sections={data}
        renderItem={({ item, section }) => (
          <TouchableHighlight
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
            <TouchableHighlight
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate("ProgrammsHome", {
                  screen: "Programm",
                  params: { programmID: section.id },
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
