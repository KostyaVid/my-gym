import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import globalStyle from "../../../utils/styles";
import P from "../../../components/P/P";
import ExerciseView from "../../../components/ExerciseView/ExerciseView";
import { LineChart } from "react-native-chart-kit";
import Container from "../../../components/Container/Container";
import HR from "../../../components/HR/HR";

type AllResultsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type Props = {
  navigation: AllResultsScreenNavigationProp;
  route: RouteProp<DailyStackList, "AllResults">;
};

const AllResults = observer(({ navigation, route }: Props) => {
  const exerciseID = route.params.exerciseID;
  const results = useStore().exercisesResults.exercises.find(
    (exercise) => exercise.id === exerciseID
  )?.results;

  const data = results?.map(({ sets }) => {
    const maxWeght = Math.max(...sets.map((set) => set.weight));
    const maxCount = Math.max(
      ...sets.filter((set) => set.weight === maxWeght).map((set) => set.count)
    );
    const date = new Date(sets[0].date).toLocaleDateString();
    return { maxWeght, maxCount, date };
  });

  if (!data) return <P size="h3">Результатов не найдено</P>;

  return (
    <View style={globalStyle.container}>
      <Container>
        <ExerciseView exerciseID={exerciseID} />
      </Container>
      <HR />
      <Container>
        <FlatList
          data={data}
          keyExtractor={(item) => item.date.toString()}
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: "row", padding: 10 }}>
              <P>
                {index + 1}. {item.date}
              </P>
              <P>{`${item.maxWeght} кг. X ${item.maxCount} раз`}</P>
            </View>
          )}
        />
      </Container>
      <HR />
      <LineChart
        data={{
          labels: data.map((item) => item.date),
          datasets: [
            {
              data: data.map((exer) => exer.maxWeght),
            },
          ],
        }}
        width={Dimensions.get("window").width}
        height={Dimensions.get("window").height * 0.3}
        yAxisSuffix="кг"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
});

const style = StyleSheet.create({});

export default AllResults;
