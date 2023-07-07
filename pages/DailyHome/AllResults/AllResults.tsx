import { StyleSheet, Dimensions, ScrollView } from "react-native";
import React from "react";
import { DailyStackList, RootStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore.store";
import globalStyle from "../../../utils/styles";
import ExerciseView from "../../../components/ExerciseView/ExerciseView";
import { LineChart } from "react-native-chart-kit";
import Container from "../../../components/Container/Container";
import { DataTable, Surface, Text } from "react-native-paper";

type AllResultsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type Props = {
  navigation: AllResultsScreenNavigationProp;
  route: RouteProp<DailyStackList, "AllResults">;
};

const AllResults = observer(({ navigation, route }: Props) => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([5, 10, 25]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

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
    return { maxWeght, maxCount, date, id: sets[0].date.toString() };
  });

  if (!data)
    return <Text variant="headlineMedium">Результатов не найдено</Text>;

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  return (
    <ScrollView style={globalStyle.container}>
      <Container>
        <ExerciseView exerciseID={exerciseID} />
      </Container>
      <Surface style={style.dataContainer}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title sortDirection="descending">№:</DataTable.Title>
            <DataTable.Title numeric>Вес (кг)</DataTable.Title>
            <DataTable.Title numeric>Количество:</DataTable.Title>
          </DataTable.Header>
          {data.slice(from, to).map((item, index) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell>{index}</DataTable.Cell>
              <DataTable.Cell numeric>{item.maxWeght + " кг"}</DataTable.Cell>
              <DataTable.Cell numeric>{item.maxCount}</DataTable.Cell>
            </DataTable.Row>
          ))}
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(data.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} из ${data.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Количество показываемых строк"}
          />
        </DataTable>
      </Surface>
      {data.length > 1 ? (
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
      ) : undefined}
    </ScrollView>
  );
});

const style = StyleSheet.create({
  dataContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
});

export default AllResults;
