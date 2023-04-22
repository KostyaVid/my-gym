import React, { useContext } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
} from "react-native";
import { observer } from "mobx-react-lite";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { useStore } from "../../../store/rootStore.store";
import { ProgrammDataProps, SessionDataProps } from "../../../data/programms";

type TrainingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

type Props = {
  navigation: TrainingScreenNavigationProp;
  route: RouteProp<DailyStackList, "Daily">;
};

const Daily: React.FC<Props> = observer(({ navigation }) => {
  const store = useStore();
  const programm = store.currentProgramm.currentProgramm;

  const createSessionID = (currentProgramm: ProgrammDataProps) => {
    let lastSessionID = store.sessions.sessions.findLast(
      (item) => item.programmID === currentProgramm.id
    )?.sessionID;
    if (!lastSessionID) lastSessionID = "s" + currentProgramm.id + "_0";

    return (
      lastSessionID.split("_")[0] +
      "_" +
      (Number(lastSessionID.split("_")[1]) + 1).toString()
    );
  };

  if (programm)
    return (
      <SafeAreaView>
        <StatusBar />
        <View>
          <Text>Текущая программа: {programm.name}</Text>
          <FlatList
            data={programm.session}
            renderItem={({ item }) => (
              <View style={style.session}>
                <TouchableHighlight
                  activeOpacity={0.6}
                  onPress={() => {
                    navigation.navigate("DailyHome", {
                      screen: "Training",
                      params: { trainingID: item.id },
                    });
                  }}
                >
                  <Text>{item.name}</Text>
                </TouchableHighlight>
                <Button
                  title="Начать"
                  onPress={() => {
                    const newSessionID = createSessionID(programm);
                    store.sessions.addSession({
                      sessionID: newSessionID,
                      programmID: programm.id,
                      dateStart: Date.now(),
                    });

                    navigation.navigate("DailyHome", {
                      screen: "Session",
                      params: { sessionID: newSessionID },
                    });
                  }}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
          ></FlatList>
          <View>
            <Text>Замеры </Text>
            <Button
              title="Замеры"
              onPress={() => {
                navigation.navigate("DailyHome", { screen: "Dimension" });
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  return <Text>Do not choose programm</Text>;
});

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  session: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default Daily;
