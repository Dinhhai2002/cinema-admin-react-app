import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { PencilSquareIcon } from "react-native-heroicons/outline";
import { Avatar, Button, DataTable } from "react-native-paper";
import Pagination from "../components/Pagination";

const BannerScreen = () => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [totalRecord, setTotalRecord] = useState<number>(20);
  const handleClick = () => {
    alert(123);
  };
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Tiêu đề</DataTable.Title>
          <DataTable.Title >Banner</DataTable.Title>
          <DataTable.Title >Hành động</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Frozen yogurt</DataTable.Cell>
          <DataTable.Cell>
            <Avatar.Image size={30} source={require("../assets/logo.png")} />
          </DataTable.Cell>
          <DataTable.Cell>
            <Button onPress={handleClick}>
              <PencilSquareIcon size="30" strokeWidth={2} color="#AE1F17" />
            </Button>
          </DataTable.Cell>
        </DataTable.Row>

        <Pagination
          setPage={setPage}
          setLimit={setLimit}
          totalRecord={totalRecord}
          limit={limit}
          page={page}
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
});

export default BannerScreen;
