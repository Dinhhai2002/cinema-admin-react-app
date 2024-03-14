import * as React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";

const TopMovie = () => {
  const [listMovie, setListMovie] = useState([
    {
      id: 1,
      name: "Cô giáo em là số 1",
      totalRevenue: 1000000,
      totalTicket: 17,
    },
    {
      id: 2,
      name: "Cô giáo em là số 1",
      totalRevenue: 1000000,
      totalTicket: 20,
    },
  ]);
  const handleClick = () => {
    alert(123);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top danh sách phim có doanh thu cao</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Tên Phim</DataTable.Title>
          <DataTable.Title numeric>Tổng doanh thu</DataTable.Title>
          <DataTable.Title numeric>Tổng số vé</DataTable.Title>
        </DataTable.Header>
        {listMovie.map((item: any) => (
          <DataTable.Row>
            <DataTable.Cell>
              <Text>{item.name} </Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>{item.totalRevenue}</DataTable.Cell>
            <DataTable.Cell numeric>{item.totalTicket}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default TopMovie;
