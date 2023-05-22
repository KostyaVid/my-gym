import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableHighlight,
  Button,
  Alert,
} from "react-native";
import { observer } from "mobx-react-lite";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { useStore } from "../../../store/rootStore.store";
import P from "../../../components/P/P";
import globalStyle from "../../../utils/styles";
import Card from "../../../components/Card/Card";
import Container from "../../../components/Container/Container";

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
  const currentTrainingID = store.currentProgramm.currentTrainingID;
  const currentSessionID = store.currentProgramm.currentSessionID;

  if (programm)
    return (
      <View style={globalStyle.container}>
        <Container>
          <P>Текущая программа: {programm.name}</P>
        </Container>

        <Card>
          <Container>
            <FlatList
              data={programm.trainings}
              renderItem={({ item, index }) => (
                <View
                  style={
                    index === 0
                      ? [style.session, { marginTop: 0 }]
                      : style.session
                  }
                >
                  <TouchableHighlight
                    activeOpacity={0.6}
                    onPress={() => {
                      navigation.navigate("DailyHome", {
                        screen: "Training",
                        params: { trainingID: item.id },
                      });
                    }}
                  >
                    <P>{item.name}</P>
                  </TouchableHighlight>
                  {currentTrainingID === item.id && currentSessionID ? (
                    <Button
                      title="Продолжить"
                      onPress={() => {
                        if (currentSessionID)
                          navigation.navigate("DailyHome", {
                            screen: "Session",
                            params: {
                              sessionID: currentSessionID,
                              trainingID: item.id,
                            },
                          });
                      }}
                    />
                  ) : (
                    <Button
                      title="Начать"
                      onPress={() => {
                        if (currentSessionID) {
                          Alert.alert(
                            "Начать",
                            "Завершить прошлую тренировку?",
                            [
                              { text: "Отмена", style: "cancel" },
                              {
                                text: "Перейти на прошлую",
                                style: "destructive",
                                onPress: () => {
                                  navigation.navigate("DailyHome", {
                                    screen: "Session",
                                    params: {
                                      sessionID: currentSessionID,
                                      trainingID: item.id,
                                    },
                                  });
                                },
                              },
                              {
                                text: "Завершить",
                                style: "default",
                                onPress: () => {
                                  store.currentProgramm.startSession(item.id);
                                  if (currentSessionID)
                                    navigation.navigate("DailyHome", {
                                      screen: "Session",
                                      params: {
                                        sessionID: currentSessionID,
                                        trainingID: item.id,
                                      },
                                    });
                                },
                              },
                            ]
                          );
                        } else {
                          store.currentProgramm.startSession(item.id);

                          if (store.currentProgramm.currentSessionID)
                            navigation.navigate("DailyHome", {
                              screen: "Session",
                              params: {
                                sessionID:
                                  store.currentProgramm.currentSessionID,
                                trainingID: item.id,
                              },
                            });
                        }
                      }}
                    />
                  )}
                </View>
              )}
              keyExtractor={(item) => item.id}
            ></FlatList>
          </Container>
        </Card>
        <View>
          <P>Замеры </P>
          <Button
            title="Замеры"
            onPress={() => {
              navigation.navigate("DailyHome", { screen: "Dimension" });
            }}
          />
        </View>
      </View>
    );
  return <P>Do not choose programm</P>;
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
