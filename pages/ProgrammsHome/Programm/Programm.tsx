import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProgrammStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import globalStyle from "../../../utils/styles";
import { useStore } from "../../../store/rootStore.store";
import Container from "../../../components/Container/Container";
import { Divider, Surface, Text, TouchableRipple } from "react-native-paper";
import BackgroundImageSurface from "../../../components/BackgoundImageSurface/BackgroundImageSurface";
import { TrainingDataProps } from "../../../data/programms";
import { observer } from "mobx-react-lite";

type TrainingScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type Props = {
  navigation: TrainingScreenNavigationProp;
  route: RouteProp<ProgrammStackList, "Programm">;
};

const Programm = ({ route, navigation }: Props) => {
  const programmID = route.params.programmID;
  const store = useStore();
  let programm = store.getProgramm(programmID);

  if (!programm)
    return (
      <Container>
        <Text>Программа не найдена</Text>
      </Container>
    );

  const renderItem: ListRenderItem<TrainingDataProps> = ({ item, index }) => (
    <TouchableRipple
      style={globalStyle.padding10}
      onPress={() => {
        navigation.navigate("ProgrammsHome", {
          screen: "Training",
          params: { programmID, trainingID: item.id },
        });
      }}
    >
      <Text>{1 + index + ". " + item.name}</Text>
    </TouchableRipple>
  );

  return (
    <View style={globalStyle.container}>
      <BackgroundImageSurface img={programm.thumbImg}>
        <Text variant="headlineMedium" style={styles.title}>
          {programm.name}
        </Text>
      </BackgroundImageSurface>
      <Container>
        <Text>Описание:</Text>
        <Text>{programm.description}</Text>
      </Container>

      <Surface style={globalStyle.mt20}>
        <FlatList
          data={programm.trainings}
          renderItem={renderItem}
          ItemSeparatorComponent={Divider}
        />
      </Surface>
    </View>
  );
};

export default Programm;

const styles = StyleSheet.create({
  title: {
    margin: 10,
  },
});
