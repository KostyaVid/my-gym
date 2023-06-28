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
import Card from "../../../components/Card/Card";
import { Set } from "../../../store/exercise.store";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

type AllResultsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DailyHome"
>;

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

  if (!data) return <P>Результатов не найдено</P>;

  return (
    <View style={globalStyle.container}>
      <ExerciseView exerciseID={exerciseID} />
      <Card>
        <>
          <LineChart
            data={{
              labels: data.map((item) => item.date),
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
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
          <FlatList
            data={data}
            keyExtractor={(item) => item.date.toString()}
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: "row", padding: 10 }}>
                <P style={style.cell}>
                  {index + 1}. {item.date}
                </P>
                <P
                  style={style.cell}
                >{`${item.maxWeght} кг. X ${item.maxCount} раз`}</P>
              </View>
            )}
          />
        </>
      </Card>
    </View>
  );
});

const style = StyleSheet.create({
  cell: {
    flex: 1,
  },
});

export default AllResults;
