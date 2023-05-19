import {
  Button,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import React, { useState } from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import SelectDropdown from "react-native-select-dropdown";
import { ExerciseType } from "../../../components/ExerciseC/ExerciseC";
import { ExerciseFullProps } from "../../../data/exercises";
import P from "../../../components/P/P";

const exerciseTypeData: ExerciseType[] = [
  "cardio",
  "static",
  "stretch",
  "weight",
];

type NewExerciseScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

type Props = {
  navigation: NewExerciseScreenNavigationProp;
  route: RouteProp<DailyStackList, "NewExercise">;
};

const NewExercise = observer(({ navigation, route }: Props) => {
  const store = useStore();
  const [exerciseType, exerciseTypeSet] = useState<ExerciseType | undefined>();
  const [name, setName] = useState("");

  const nameHandle = (text: string) => {
    setName(text);
  };

  return (
    <View>
      <View style={style.label}>
        <P>Название: </P>
        <TextInput
          placeholder="Упражнение 1"
          onChangeText={nameHandle}
          value={name}
        />
      </View>
      <View style={style.label}>
        <P>Вид: </P>
        <SelectDropdown
          data={exerciseTypeData}
          defaultButtonText="Не выбран"
          onSelect={(selectedItem, index) => {
            exerciseTypeSet(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>
      <Button
        title="Создать"
        onPress={() => {
          const exercise: ExerciseFullProps = {
            id: "c" + Date.now().toString(),
            name,
            mainMuscle: "none",
            exerciseType,
          };
          store.customExercises.addCustomExercise(exercise);
          navigation.goBack();
        }}
      />
    </View>
  );
});

const style = StyleSheet.create({
  label: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});

export default NewExercise;
