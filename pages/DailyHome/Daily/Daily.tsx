import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Alert,
  ListRenderItem,
} from "react-native";
import { observer } from "mobx-react-lite";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { useStore } from "../../../store/rootStore.store";
import P from "../../../components/P/P";
import globalStyle from "../../../utils/styles";
import Container from "../../../components/Container/Container";
import { TrainingDataProps } from "../../../data/programms";
import BasicButton from "../../../components/Buttons/BasicButton/BasicButton";
import Touch from "../../../components/Touch/Touch";
import HR from "../../../components/HR/HR";
import { Card } from "react-native-paper";

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

  const renderItem: ListRenderItem<TrainingDataProps> | null | undefined = ({
    item,
  }) => {
    const goSessionPage = () => {
      if (store.currentProgramm.currentSessionID)
        navigation.navigate("DailyHome", {
          screen: "Session",
          params: {
            sessionID: store.currentProgramm.currentSessionID,
            trainingID: item.id,
          },
        });
    };

    return (
      <View style={style.session}>
        <Touch
          style={style.training}
          onPress={() => {
            navigation.navigate("DailyHome", {
              screen: "Training",
              params: { trainingID: item.id },
            });
          }}
        >
          <P>{item.name}</P>
        </Touch>
        {currentTrainingID === item.id &&
        store.currentProgramm.currentSessionID ? (
          <BasicButton title="Продолжить" onPress={goSessionPage} />
        ) : (
          <BasicButton
            title="Начать"
            onPress={() => {
              if (store.currentProgramm.currentSessionID) {
                Alert.alert("Начать", "Завершить прошлую тренировку?", [
                  { text: "Отмена", style: "cancel" },
                  {
                    text: "Перейти на прошлую",
                    style: "destructive",
                    onPress: goSessionPage,
                  },
                  {
                    text: "Завершить",
                    style: "default",
                    onPress: () => {
                      store.currentProgramm.startSession(item.id);
                      goSessionPage();
                    },
                  },
                ]);
              } else {
                store.currentProgramm.startSession(item.id);
                goSessionPage();
              }
            }}
          />
        )}
      </View>
    );
  };

  if (programm)
    return (
      <View style={globalStyle.container}>
        <Container>
          <P size="h2">Текущая программа: {programm.name}</P>
        </Container>
        <Card>
          <Container>
            <FlatList
              data={programm.trainings}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={HR}
            ></FlatList>
          </Container>
        </Card>
        <View style={style.dimension}>
          <P size="h2">Замеры </P>
          <BasicButton
            title="Замеры"
            onPress={() => {
              navigation.navigate("DailyHome", { screen: "Dimension" });
            }}
          />
        </View>
      </View>
    );
  return <P>Не выбрана программа</P>;
});

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  session: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dimension: {
    marginTop: 20,
  },
  training: {
    flexGrow: 1,
    paddingVertical: 20,
  },
});

export default Daily;
