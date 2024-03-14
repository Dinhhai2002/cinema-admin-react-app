import * as React from "react";
import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { PencilSquareIcon } from "react-native-heroicons/outline";
import { Button, DataTable } from "react-native-paper";
import Pagination from "../components/Pagination";

const UserScreen = () => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [totalRecord, setTotalRecord] = useState<number>(20);

  const handleClick = () => {
    alert(123);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách người dùng</Text>
      <DataTable>
        <DataTable.Header >
          <DataTable.Title>Mã người dùng</DataTable.Title>
          <DataTable.Title numeric>Họ tên</DataTable.Title>
          <DataTable.Title numeric>Vai trò</DataTable.Title>
          <DataTable.Title numeric>Email</DataTable.Title>
          <DataTable.Title numeric>Số điện thoại</DataTable.Title>
          <DataTable.Title numeric>Trạng thái</DataTable.Title>
          <DataTable.Title numeric>Xóa</DataTable.Title>
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
          <DataTable.Cell numeric>
            <Button>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
export default UserScreen;
