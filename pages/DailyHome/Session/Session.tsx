import { View, Text, FlatList, TouchableHighlight } from "react-native";
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

const Session = observer(({ navigation, route }: Props) => {
  const sessionID = route.params.sessionID;
  const store = useStore();
  const session = store.currentProgramm.currentProgramm?.session.find(
    ({ id }) => (id = sessionID)
  );

  if (session)
    return (
      <View>
        <Text>Тренировка: {session.name}</Text>
        <FlatList
          data={session.exerciseIDs}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              onPress={() => {
                navigation.navigate("DailyHome", {
                  screen: "Exercise",
                  params: { exerciseID: item, sessionID: sessionID },
                });
              }}
            >
              <Text>{(index + 1).toString() + ". " + item}</Text>
            </TouchableHighlight>
          )}
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
