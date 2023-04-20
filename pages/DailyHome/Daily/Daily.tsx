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

type TrainingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

type Props = {
  navigation: TrainingScreenNavigationProp;
  route: RouteProp<DailyStackList, "Daily">;
};

const Daily: React.FC<Props> = observer(({ navigation }) => {
  const programm = useStore().currentProgramm.currentProgramm;

  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        <Text>
          Текущая программа: {programm?.name ? programm.name : "Не выбрана"}
        </Text>
        <FlatList
          data={programm?.session}
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
                  navigation.navigate("DailyHome", {
                    screen: "Session",
                    params: { trainingID: item.id },
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
