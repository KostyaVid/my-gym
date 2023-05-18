import { View, Text, TouchableHighlight } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";

type ElseNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ElseHome"
>;

type Props = {
  navigation: ElseNavigationProp;
};

const Else: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("ElseHome", { screen: "Settings" });
        }}
      >
        <Text>Настройки</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Else;
