import { observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import { useStore } from "../../store/rootStore.store";
import Calendar from "../../components/Calendar/Calendar";
import P from "../../components/P/P";
import globalStyle from "../../utils/styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";
import Touch from "../../components/Touch/Touch";

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
      <Card>
        <Touch onPress={currentProgramm ? goToProgramm : goToChooseProgramm}>
          <Container>
            <P>Выбранная программа:</P>
            {currentProgramm ? (
              <P>{currentProgramm.name}</P>
            ) : (
              <P>Не выбрана</P>
            )}
          </Container>
        </Touch>
      </Card>
    </View>
  );
});

export default Home;
