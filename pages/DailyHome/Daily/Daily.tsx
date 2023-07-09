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
import globalStyle from "../../../utils/styles";
import Container from "../../../components/Container/Container";
import { TrainingDataProps } from "../../../data/programms";
import {
  Button,
  Divider,
  Surface,
  Text,
  TouchableRipple,
} from "react-native-paper";

type TrainingScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

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
        <TouchableRipple
          style={style.training}
          onPress={() => {
            navigation.navigate("DailyHome", {
              screen: "Training",
              params: { trainingID: item.id },
            });
          }}
        >
          <Text>{item.name}</Text>
        </TouchableRipple>
        {currentTrainingID === item.id &&
        store.currentProgramm.currentSessionID ? (
          <Button mode="outlined" icon="backup-restore" onPress={goSessionPage}>
            Продолжить
          </Button>
        ) : (
          <Button
            icon="plus"
            mode="outlined"
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
          >
            Начать
          </Button>
        )}
      </View>
    );
  };

  if (programm)
    return (
      <View style={globalStyle.container}>
        <Container>
          <Text variant="titleLarge">Текущая программа: {programm.name}</Text>
        </Container>
        <Surface style={globalStyle.mt20}>
          <Container>
            <FlatList
              data={programm.trainings}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={Divider}
            ></FlatList>
          </Container>
        </Surface>
        <Divider style={globalStyle.mt20} />
        <Container style={globalStyle.mt20}>
          <Button
            mode="elevated"
            onPress={() => {
              navigation.navigate("DailyHome", { screen: "Dimension" });
            }}
          >
            Замеры
          </Button>
        </Container>
      </View>
    );
  return (
    <Container>
      <Button
        onPress={() => {
          navigation.navigate("ProgrammsHome", { screen: "Programms" });
        }}
      >
        Не выбрана программа
      </Button>
    </Container>
  );
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

  training: {
    flexGrow: 1,
    paddingVertical: 20,
  },
});

export default Daily;
