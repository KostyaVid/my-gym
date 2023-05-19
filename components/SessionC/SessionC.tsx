import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TrainingDataProps, programmsData } from "../../data/programms";
import { observer } from "mobx-react-lite";
import P from "../P/P";

export type SessionProps = {
  id: string;
  name?: string;
  thumbImg?: string;
};

const SessionC: React.FC<SessionProps> = observer(({ id }) => {
  let data: undefined | TrainingDataProps;
  for (let i = 0; i < programmsData.length; i++) {
    data = programmsData[i].trainings.find((elem) => elem.id === id);
    if (data) break;
  }

  if (data)
    return (
      <View>
        <P>{data.name}</P>
      </View>
    );
  return (
    <View>
      <P>Training section with id: {id} not found</P>
    </View>
  );
});

export default SessionC;

const styles = StyleSheet.create({});
