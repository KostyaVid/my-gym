import React from "react";
import {
  FlatList,
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
import { ProgrammDataProps } from "../../../data/programms";

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

  if (programm)
    return (
      <View>
        <Text>Текущая программа: {programm.name}</Text>
        <FlatList
          data={programm.trainings}
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
                  store.currentProgramm.startSession(item.id);
                  if (store.currentProgramm.currentSessionID)
                    navigation.navigate("DailyHome", {
                      screen: "Session",
                      params: {
                        sessionID: store.currentProgramm.currentSessionID,
                        trainingID: item.id,
                      },
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
