import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useStore } from "../../store/rootStore.store";
import Calendar from "../../components/Calendar/Calendar";
import globalStyle from "../../utils/styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { Surface, Text } from "react-native-paper";
import Touch from "../../components/Touch/Touch";
import Container from "../../components/Container/Container";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = observer(({ navigation }) => {
  const store = useStore();
  const currentProgramm = store.currentProgramm.currentProgramm;
  function goToProgramm() {
    navigation.navigate("DailyHome", {
      screen: "Daily",
    });
  }

  function goToChooseProgramm() {
    navigation.navigate("ProgrammsHome", { screen: "Programms" });
  }

  return (
    <View style={globalStyle.container}>
      <Calendar />
      <Surface style={styles.card} elevation={3}>
        <Touch onPress={currentProgramm ? goToProgramm : goToChooseProgramm}>
          <Container>
            <Text variant="titleLarge">Выбранная программа:</Text>
            <Text variant="bodyMedium">
              {currentProgramm ? currentProgramm.name : "Не выбрана"}
            </Text>
          </Container>
        </Touch>
      </Surface>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
  },
});
export default Home;
