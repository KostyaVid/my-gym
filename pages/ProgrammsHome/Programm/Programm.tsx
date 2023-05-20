import { StyleSheet, View } from "react-native";
import React from "react";
import ProgrammC from "../../../components/ProgrammC/ProgrammC";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProgrammStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import globalStyle from "../../../utils/styles";

type TrainingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

type Props = {
  navigation: TrainingScreenNavigationProp;
  route: RouteProp<ProgrammStackList, "Programm">;
};

const Programm = ({ route }: Props) => {
  return (
    <View style={globalStyle.container}>
      <ProgrammC id={route.params.programmID} />
    </View>
  );
};

export default Programm;

const styles = StyleSheet.create({});
