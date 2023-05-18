import { observer } from "mobx-react-lite";
import React from "react";
import { Text, View } from "react-native";
import { useStore } from "../../store/rootStore.store";
import Calendar from "../../components/Calendar/Calendar";

const Home = observer(() => {
  const state = useStore();
  return (
    <View>
      <Calendar />
      <Text>
        Выбранная программа: {state.currentProgramm.currentProgramm?.name}
      </Text>
    </View>
  );
});

export default Home;
