import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";
import utils from "../utils/UtilsClass";

const TopMovie = ({ listMovie }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top danh sách phim có doanh thu cao</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Tên Phim</DataTable.Title>
          <DataTable.Title numeric>Tổng doanh thu</DataTable.Title>
          <DataTable.Title numeric>Tổng số vé</DataTable.Title>
        </DataTable.Header>
        {listMovie?.map((item: any) => (
          <DataTable.Row key={item._id}>
            <DataTable.Cell>
              <Text>{item.movie_name} </Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              {utils.formatMoney(item.total_revenue)}
            </DataTable.Cell>
            <DataTable.Cell numeric>{item.total_booking}</DataTable.Cell>
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
