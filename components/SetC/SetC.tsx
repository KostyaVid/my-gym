import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { Divider, IconButton, TextInput } from "react-native-paper";
import { DailyStackList, RootStackParamList } from "../../types";
import { useStore } from "../../store/rootStore.store";
import globalStyle from "../../utils/styles";
import InputNumber from "../InputNumber/InputNumber";
import Container from "../Container/Container";

type Props = {
  backHandle: () => void;
  FinishHandle: (weight: number, count: number, comment: string) => void;
  initWeight?: string;
  initCount?: string;
  initComment?: string;
};

const SetC: React.FC<Props> = observer(
  ({
    backHandle,
    FinishHandle,
    initWeight = "0",
    initCount = "0",
    initComment = "0",
  }) => {
    const [weight, setWeight] = useState(initWeight);
    const [count, setCount] = useState(initCount);
    const [comment, setComment] = useState(initComment);
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
        <Divider style={globalStyle.mt20} />
        <Container style={globalStyle.mt20}>
          <TextInput
            mode="outlined"
            value={comment}
            onChangeText={setComment}
            label="Комментарий:"
            placeholder="Введите комментарий..."
            multiline={true}
          />
        </Container>
        <Container style={styles.buttons}>
          <IconButton
            iconColor="#cc0000"
            size={60}
            mode="outlined"
            icon="keyboard-return"
            onPress={backHandle}
          />
          <IconButton
            size={60}
            mode="outlined"
            icon="check-bold"
            iconColor="green"
            onPress={() => {
              const w = Number(weight.length ? weight : "0");
              const c = Number(count.length ? count : "0");
              if (!w || !c) {
                if (!w) setDangerWeight(true);
                if (!c) setDangerCount(true);
                return;
              }
              FinishHandle(w, c, comment);
            }}
          />
        </Container>
      </View>
    );
  }
);

export default SetC;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
