import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import moment from "moment";
import globalStyle from "../../../utils/styles";
import { Divider, Surface, Text, TouchableRipple } from "react-native-paper";
import Container from "../../../components/Container/Container";

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
  if (!sessions)
    return (
      <Container>
        <Text variant="headlineSmall">В данный день не найдены тренировки</Text>
      </Container>
    );
  return (
    <View style={globalStyle.container}>
      <Text variant="headlineSmall">
        {"Дата: " + new Date(sessions[0].dateStart).toLocaleDateString()}
      </Text>
      <Surface style={styles.containerSessions}>
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.sessionID}
          ItemSeparatorComponent={Divider}
          renderItem={({ item, index }) => (
            <TouchableRipple
              style={globalStyle.padding10}
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
              <Text variant="bodyLarge">
                {index +
                  1 +
                  ". " +
                  new Date(item.dateStart).toTimeString().split(" ")[0] +
                  " - " +
                  (item.dateEnd
                    ? new Date(item.dateEnd).toTimeString().split(" ")[0]
                    : "не завершена")}
              </Text>
            </TouchableRipple>
          )}
        />
      </Surface>
    </View>
  );
});

const styles = StyleSheet.create({
  containerSessions: {
    marginTop: 20,
  },
});

export default ChooseSession;
