import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProgrammC from "../../../components/ProgrammC/ProgrammC";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProgrammStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";

type TrainingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

type Props = {
  navigation: TrainingScreenNavigationProp;
  route: RouteProp<ProgrammStackList, "Programm">;
};

const Programm = ({ route }: Props) => {
  return <ProgrammC id={route.params.id} />;
};

export default Programm;

const styles = StyleSheet.create({});
