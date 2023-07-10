import { ImageSourcePropType, StyleSheet, View } from "react-native";
import React from "react";
import { programmsData } from "../../data/programms";
import { observer } from "mobx-react-lite";
import { Text } from "react-native-paper";

export type ProgrammProps = {
  id: string;
  name?: string;
  thumbImg?: ImageSourcePropType;
  description?: string;
};

const ProgrammC: React.FC<ProgrammProps> = observer(({ id }) => {
  const data = programmsData.find((elem) => elem.id === id);
  if (data) {
    return (
      <View>
        <Text>{data.name}</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Training programm with id: {id} not found</Text>
      </View>
    );
  }
});

export default ProgrammC;

const styles = StyleSheet.create({});
