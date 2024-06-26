import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PencilSquareIcon } from "react-native-heroicons/outline";
import { Button, DataTable, Searchbar } from "react-native-paper";
import userApi from "../apis/user.api";
import Pagination from "../components/Pagination";

const UserScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState<number | null>(null);

  const navigation = useNavigation<any>();

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
  let dataTable = data?.data.data;
  const total = data?.data.total_record;

  React.useEffect(() => {
    refetch;
  }, [pageSize]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách người dùng</Text>
      <Searchbar
        placeholder="Tìm kiếm"
        onChangeText={setKeyword}
        value={keyword}
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Mã người dùng</DataTable.Title>
          <DataTable.Title numeric>Họ tên</DataTable.Title>
          <DataTable.Title numeric>Email</DataTable.Title>
          <DataTable.Title numeric>Số điện thoại</DataTable.Title>
          <DataTable.Title numeric>Xóa</DataTable.Title>
        </DataTable.Header>
        {dataTable &&
          dataTable?.map((user) => (
            <DataTable.Row key={user._id}>
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
                <Button
                  onPress={() =>
                    navigation.navigate("UserView", {
                      user: user,
                    })
                  }
                >
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
