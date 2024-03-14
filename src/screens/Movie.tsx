import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PencilSquareIcon } from "react-native-heroicons/outline";
import { Button, DataTable } from "react-native-paper";

const MovieScreen = () => {
  const handleClick = () => {
    alert(123);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách phim</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Dessert</DataTable.Title>
          <DataTable.Title numeric>Calories</DataTable.Title>
          <DataTable.Title numeric>Fat</DataTable.Title>
          <DataTable.Title numeric>Chỉnh sửa</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Frozen yogurt</DataTable.Cell>
          <DataTable.Cell numeric>159</DataTable.Cell>
          <DataTable.Cell numeric>6.0</DataTable.Cell>
          <DataTable.Cell numeric>
            <Button>
              <PencilSquareIcon size="30" strokeWidth={2} color="#AE1F17" />
            </Button>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
          <DataTable.Cell numeric>237</DataTable.Cell>
          <DataTable.Cell numeric>8.0</DataTable.Cell>
          <DataTable.Cell numeric>
            <Button onPress={handleClick}>
              <PencilSquareIcon size="30" strokeWidth={2} color="#AE1F17" />
            </Button>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={(page: any) => {
            console.log(page);
          }}
          label="1-2 of 6"
        />
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default MovieScreen;
