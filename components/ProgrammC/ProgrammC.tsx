import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { programmsData } from "../../data/programms";
import { observer } from "mobx-react-lite";
import P from "../P/P";

export type ProgrammProps = {
  id: string;
  name?: string;
  thumbImg?: string;
  description?: string;
};

const ProgrammC: React.FC<ProgrammProps> = observer(({ id }) => {
  const data = programmsData.find((elem) => elem.id === id);
  if (data) {
    return (
      <View>
        <P>{data.name}</P>
      </View>
    );
  } else {
    return (
      <View>
        <P>Training programm with id: {id} not found</P>
      </View>
    );
  }
});

export default ProgrammC;

const styles = StyleSheet.create({});
