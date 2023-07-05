import { View, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import { Set } from "../../../store/exercise.store";
import globalStyle from "../../../utils/styles";
import InputNumber from "../../../components/InputNumber/InputNumber";
import BasicButton from "../../../components/Buttons/BasicButton/BasicButton";
import Container from "../../../components/Container/Container";
import InputComment from "../../../components/InputComment/InputComment";
import HR from "../../../components/HR/HR";

type NewSetScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

type Props = {
  navigation: NewSetScreenNavigationProp;
  route: RouteProp<DailyStackList, "NewSet">;
};

const NewSet = observer(({ navigation, route }: Props) => {
  const [weight, setWeight] = useState("0");
  const [count, setCount] = useState("0");
  const [comment, setComment] = useState("");
  const [dangerWeight, setDangerWeight] = useState(false);
  const [dangerCount, setDangerCount] = useState(false);

  useEffect(() => {
    if (dangerWeight) {
      setTimeout(() => {
        setDangerWeight(false);
      }, 1000);
    }
  }, [dangerWeight, setDangerWeight]);

  useEffect(() => {
    if (dangerCount) {
      setTimeout(() => {
        setDangerCount(false);
      }, 1000);
    }
  }, [dangerCount, setDangerCount]);

  const exerciseID = route.params.exerciseID;
  const sessionID = route.params.sessionID;
  const trainingID = route.params.trainingID;
  const store = useStore();
  const exercise = store.exercisesResults.getExercise(exerciseID);

  return (
    <View style={globalStyle.container}>
      <InputNumber
        title="Вес:"
        value={weight}
        setValue={setWeight}
        danger={dangerWeight}
      />
      <InputNumber
        title="Количество:"
        value={count}
        setValue={setCount}
        isInteger={true}
        danger={dangerCount}
      />
      <HR />
      <InputComment
        value={comment}
        setValue={setComment}
        title="Комментарий:"
        placeholder="Введите комментарий..."
      />
      <Container style={styles.buttons}>
        <BasicButton
          title="Отмена"
          variant="danger"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <BasicButton
          title="Добавить"
          onPress={() => {
            const w = Number(weight.length ? weight : "0");
            const c = Number(count.length ? count : "0");
            if (!w || !c) {
              if (!w) setDangerWeight(true);
              if (!c) setDangerCount(true);
              return;
            }
            const date = Date.now();
            const set: Set = {
              id: "p" + date,
              date: date,
              weight: w,
              count: c,
              comment: comment ? comment : undefined,
            };
            if (exercise) {
              store.exercisesResults.addExerciseResultInSession(
                exerciseID,
                sessionID,
                set
              );
            } else {
              store.exercisesResults.addFirstExerciseResultInSession(
                exerciseID,
                sessionID,
                set
              );
            }

            navigation.navigate("DailyHome", {
              screen: "Exercise",
              params: { exerciseID, sessionID, trainingID },
            });
          }}
        />
      </Container>
    </View>
  );
});

export default NewSet;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
