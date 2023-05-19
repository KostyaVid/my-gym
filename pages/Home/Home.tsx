import { observer } from "mobx-react-lite";
import React from "react";
import { Text, View } from "react-native";
import { useStore } from "../../store/rootStore.store";
import Calendar from "../../components/Calendar/Calendar";
import { useTheme } from "@react-navigation/native";
import P from "../../components/P/P";

const Home = observer(() => {
  const state = useStore();
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Calendar />
      <P>Выбранная программа: {state.currentProgramm.currentProgramm?.name}</P>
    </View>
  );
});

export default Home;
