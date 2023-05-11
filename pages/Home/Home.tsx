import { observer } from "mobx-react-lite";
import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import { useStore } from "../../store/rootStore.store";
import Calendar from "../../components/Calendar/Calendar";

const Home = observer(() => {
  const state = useStore();
  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        <Calendar />
        <Text>Программа: {state.currentProgramm.currentProgramm?.name}</Text>
      </View>
    </SafeAreaView>
  );
});

export default Home;
