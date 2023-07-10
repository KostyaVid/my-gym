import { observer } from "mobx-react-lite";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useStore } from "../../store/rootStore.store";
import Calendar from "../../components/Calendar/Calendar";
import globalStyle from "../../utils/styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { Text, TouchableRipple } from "react-native-paper";
import Container from "../../components/Container/Container";
import BackgroundImageSurface from "../../components/BackgoundImageSurface/BackgroundImageSurface";

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
    <ScrollView style={globalStyle.container}>
      <Calendar />
      <TouchableRipple
        style={globalStyle.mt20}
        onPress={currentProgramm ? goToProgramm : goToChooseProgramm}
      >
        <BackgroundImageSurface img={currentProgramm?.thumbImg}>
          <Container>
            <Text variant="headlineMedium">Выбранная программа:</Text>
            <Text variant="labelLarge">
              {currentProgramm ? currentProgramm.name : "Не выбрана"}
            </Text>
          </Container>
        </BackgroundImageSurface>
      </TouchableRipple>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
  },
});
export default Home;
