import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { PencilSquareIcon } from "react-native-heroicons/outline";
import { Button, DataTable } from "react-native-paper";
import userApi from "../apis/user.api";
import Pagination from "../components/Pagination";
import { User } from "../types/user.type";

const UserScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState<number | null>(null);

  const queryConfig = {
    page: currentPage,
    page_size: pageSize,
    key_search: keyword,
    role: role,
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user", queryConfig],
    queryFn: () => userApi.getUsers(queryConfig),
    staleTime: 3 * 60 * 1000,
  });
  const dataTable = data?.data.data;
  const total = data?.data.total_record;
  console.log(dataTable);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách người dùng</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Mã người dùng</DataTable.Title>
          <DataTable.Title numeric>Họ tên</DataTable.Title>
          {/* <DataTable.Title numeric>Vai trò</DataTable.Title> */}
          <DataTable.Title numeric>Email</DataTable.Title>
          <DataTable.Title numeric>Số điện thoại</DataTable.Title>
          {/* <DataTable.Title numeric>Trạng thái</DataTable.Title> */}
          <DataTable.Title numeric>Xóa</DataTable.Title>
        </DataTable.Header>
        {dataTable &&
          dataTable?.map((user): any => (
            <DataTable.Row>
              <DataTable.Cell>{user._id}</DataTable.Cell>
              <DataTable.Cell numeric>{user.name}</DataTable.Cell>
              <DataTable.Cell numeric>{user.email}</DataTable.Cell>
              <DataTable.Cell numeric>{user.phone}</DataTable.Cell>
              {/* <DataTable.Cell numeric>
              <Button>
                <PencilSquareIcon size="30" strokeWidth={2} color="#AE1F17" />
              </Button>
            </DataTable.Cell> */}
              <DataTable.Cell numeric>
                <Button>
                  <PencilSquareIcon size="30" strokeWidth={2} color="#AE1F17" />
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
          ))}

        <Pagination
          setPage={setCurrentPage}
          setLimit={setPageSize}
          totalRecord={total}
          limit={pageSize}
          page={currentPage}
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
