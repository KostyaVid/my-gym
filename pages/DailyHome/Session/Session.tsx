import { View, Text, FlatList } from "react-native";
import React from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";

type SessionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

type Props = {
  navigation: SessionScreenNavigationProp;
  route: RouteProp<DailyStackList, "Session">;
};

const Session = observer(({ route }: Props) => {
  const trainingID = route.params.trainingID;
  const store = useStore();
  const training = store.currentProgramm.currentProgramm?.session.find(
    ({ id }) => (id = trainingID)
  );

  if (training)
    return (
      <View>
        <Text>Тренировка: {training.name}</Text>
        <FlatList
          data={training.exerciseIDs}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      </View>
    );

  return (
    <View>
      <Text>Oops</Text>
    </View>
  );
});

export default Session;
