import { StyleSheet, View } from "react-native";
import React from "react";
import Container from "../Container/Container";
import { DataTable, Surface, Text } from "react-native-paper";
import { Set } from "../../store/exercise.store";
import { observer } from "mobx-react-lite";
import DiffAbove from "../DiffAbove/DiffAbove";

type Props = {
  sets?: Set[];
  prevSets?: Set[];
  handlePressRow: (id: string) => void;
};

const TableResults: React.FC<Props> = observer(
  ({ handlePressRow, sets = [], prevSets = [] }) => {
    const totalSets = [];
    let k = 0;
    const maxLength = Math.max(sets.length, prevSets.length);
    while (k < maxLength) {
      totalSets.push({
        prevSet: prevSets[k],
        currentSet: sets[k],
        diff:
          sets[k] && prevSets[k]
            ? {
                weight: sets[k].weight - prevSets[k].weight,
                count: sets[k].count - prevSets[k].count,
              }
            : null,
      });
      k++;
    }
    const hasComment = totalSets.find(
      (set) => set.prevSet?.comment || set.currentSet?.comment
    );
    return (
      <>
        <Container style={style.results}>
          <Text variant="headlineMedium">Результаты:</Text>
        </Container>
        <Surface style={style.dataContainer}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title sortDirection="descending">№:</DataTable.Title>
              <DataTable.Title>Вес (кг)</DataTable.Title>
              <DataTable.Title>Повторы:</DataTable.Title>
              {hasComment && <DataTable.Title>Комментарии:</DataTable.Title>}
            </DataTable.Header>
            {totalSets.map((item, index) => {
              const isCurrent = item.currentSet !== undefined;
              const set = isCurrent ? item.currentSet : item.prevSet;
              const cellStyle = isCurrent
                ? style.dataCell
                : style.dataCellOpacity;

              return (
                <DataTable.Row
                  key={set.id}
                  onPress={isCurrent ? () => handlePressRow(set.id) : undefined}
                >
                  <DataTable.Cell textStyle={cellStyle}>
                    {1 + index}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <View style={style.cellContainer}>
                      <Text style={cellStyle}>{set.weight + " кг"}</Text>
                      {item.diff && <DiffAbove value={item.diff.weight} />}
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <View style={style.cellContainer}>
                      <Text style={cellStyle}>{set.count}</Text>
                      {item.diff && <DiffAbove value={item.diff.count} />}
                    </View>
                  </DataTable.Cell>
                  {hasComment && (
                    <DataTable.Cell textStyle={cellStyle}>
                      {((isCurrent && item.currentSet.comment) ||
                        (!isCurrent && item.prevSet)) &&
                        (isCurrent
                          ? item.currentSet.comment
                          : item.prevSet.comment)}
                    </DataTable.Cell>
                  )}
                </DataTable.Row>
              );
            })}
          </DataTable>
        </Surface>
      </>
    );
  }
);

export default TableResults;

const style = StyleSheet.create({
  results: {
    flex: 1,
  },
  dataContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  dataCell: {
    fontSize: 20,
  },
  dataCellOpacity: {
    opacity: 0.4,
    fontSize: 20,
  },
  cellContainer: {
    flexDirection: "row",
    gap: 3,
    justifyContent: "center",
  },
});
