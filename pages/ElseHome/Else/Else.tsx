import { View, TouchableHighlight } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import P from "../../../components/P/P";
import globalStyle from "../../../utils/styles";

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
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("ElseHome", { screen: "Settings" });
        }}
      >
        <P>Настройки</P>
      </TouchableHighlight>
    </View>
  );
};

export default Else;
