import { FlatList, Text, TouchableHighlight, View } from "react-native";
import React from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import moment from "moment";
import P from "../../../components/P/P";

type ChooseSessionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

type Props = {
  navigation: ChooseSessionScreenNavigationProp;
  route: RouteProp<DailyStackList, "ChooseSession">;
};

const ChooseSession = observer(({ navigation, route }: Props) => {
  const store = useStore();
  const date = moment(route.params.date).startOf("day");
  const sessions = store.sessions.sessions.filter((sess) =>
    moment(sess.dateStart).startOf("day").isSame(date)
  );
  if (!sessions) return <P>В данный день не найдены тренировки</P>;
  return (
    <FlatList
      data={sessions}
      keyExtractor={(item) => item.sessionID}
      renderItem={({ item }) => (
        <TouchableHighlight
          onPress={() => {
            navigation.navigate("DailyHome", {
              screen: "Session",
              params: {
                sessionID: item.sessionID,
                trainingID: item.trainingID,
              },
            });
          }}
        >
          <P>{item.trainingID}</P>
        </TouchableHighlight>
      )}
    />
  );
});

export default ChooseSession;
