import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SessionC from "../../../components/SessionC/SessionC";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProgrammStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";

type SessionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ProgrammsHome"
>;

type Props = {
  navigation: SessionScreenNavigationProp;
  route: RouteProp<ProgrammStackList, "Session">;
};

const Session = (props: Props) => {
  return <SessionC id={props.route.params.id} />;
};

export default Session;

const styles = StyleSheet.create({});
