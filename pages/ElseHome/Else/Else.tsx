import { View } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import P from "../../../components/P/P";
import globalStyle from "../../../utils/styles";
import Touch from "../../../components/Touch/Touch";

type ElseNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ElseHome"
>;

type Props = {
  navigation: ElseNavigationProp;
};

const Else: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={globalStyle.container}>
      <Touch
        onPress={() => {
          navigation.navigate("ElseHome", { screen: "Settings" });
        }}
      >
        <P>Настройки</P>
      </Touch>
    </View>
  );
};

export default Else;
