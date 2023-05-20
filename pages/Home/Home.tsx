import { observer } from "mobx-react-lite";
import React from "react";
import { TouchableHighlight, View } from "react-native";
import { useStore } from "../../store/rootStore.store";
import Calendar from "../../components/Calendar/Calendar";
import P from "../../components/P/P";
import globalStyle from "../../utils/styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { RouteProp } from "@react-navigation/native";

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

  return (
    <View style={globalStyle.container}>
      <Calendar />
      <P>Выбранная программа:</P>
      {currentProgramm ? (
        <TouchableHighlight
          onPress={() => {
            navigation.navigate("DailyHome", {
              screen: "Daily",
            });
          }}
        >
          <P>{currentProgramm.name}</P>
        </TouchableHighlight>
      ) : (
        <P>Не выбрана</P>
      )}
    </View>
  );
});

export default Home;
