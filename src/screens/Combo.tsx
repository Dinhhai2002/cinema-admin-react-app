import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PencilSquareIcon, TrashIcon } from "react-native-heroicons/outline";
import {
  Button,
  DataTable,
  Modal,
  PaperProvider,
  Portal,
  Searchbar,
} from "react-native-paper";
import Toast from "react-native-toast-message";
import comboApi from "../apis/combo.api";
import Pagination from "../components/Pagination";
import { Combo, comboType } from "../types/combo.type";
import utils from "../utils/UtilsClass";

const ComboScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState<number | null>(null);

  const navigation = useNavigation<any>();
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const queryConfig = {
    page: currentPage,
    page_size: pageSize,
    key_search: keyword,
    type: type,
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["combo", queryConfig],
    queryFn: () => comboApi.getCombos(queryConfig),
    staleTime: 3 * 60 * 1000,
  });

  const deleteCombo = useMutation({
    mutationKey: ["movie"],
    mutationFn: (body: string[]) => comboApi.deleteCombo(body),
  });
  const dataTable = data?.data.data;
  const total = data?.data.total_record;

  const [modalVisible, setModalVisible] = useState(
    new Array(dataTable?.length).fill(false)
  );
  const hideShowModal = (index: number, typeVisible: number) => {
    const newModalVisible = [...modalVisible];
    newModalVisible[index] = typeVisible === 1 ? true : false;
    setModalVisible(newModalVisible);
  };
  React.useEffect(() => {
    refetch();
  }, []);

  const handleSubmit = (combo: Combo, index: number) => {
    deleteCombo.mutate([combo._id] as string[], {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: `Xóa combo ${combo.name} thành công!`,
        });
        refetch();
      },
      onError: (error) => {},
    });
    hideShowModal(index, 0);
    refetch();
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Danh sách combo</Text>
        <Searchbar
          placeholder="Tìm kiếm"
          onChangeText={setKeyword}
          value={keyword}
        />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Tên combo</DataTable.Title>
            <DataTable.Title numeric>Giá</DataTable.Title>
            <DataTable.Title numeric>Loại</DataTable.Title>
            <DataTable.Title numeric>Cập nhật</DataTable.Title>
            <DataTable.Title numeric>Xóa</DataTable.Title>
          </DataTable.Header>
          {dataTable &&
            dataTable?.map((combo: Combo, index: number) => (
              <DataTable.Row key={combo._id}>
                <DataTable.Cell>{combo.name}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {utils.formatMoney(combo.price)}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {comboType[combo.type - 1]}
                </DataTable.Cell>
                <DataTable.Cell>
                  <Button
                    onPress={() =>
                      navigation.navigate("ComboEdit", {
                        combo: combo,
                        refetch: refetch,
                      })
                    }
                  >
                    <PencilSquareIcon
                      size="25"
                      strokeWidth={2}
                      color="#AE1F17"
                    />
                  </Button>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Button
                    onPress={() => {
                      hideShowModal(index, 1);
                    }}
                  >
                    <TrashIcon size="25" strokeWidth={2} color="#AE1F17" />
                  </Button>
                </DataTable.Cell>
                <Portal>
                  <Modal
                    visible={modalVisible[index]}
                    onDismiss={() => {
                      hideShowModal(index, 0);
                    }}
                    contentContainerStyle={containerStyle}
                  >
                    <Text className="px-[1px] py-[1px] font-semibold  ">
                      Bạn có chắc chắn thay đổi trạng thái combo "{combo.name}"
                      ?
                    </Text>
                    <Button
                      className="px-[1px] py-[2px] bg-[#AE1F17] mt-[12px] "
                      onPress={() => {
                        handleSubmit(combo, index);
                      }}
                    >
                      <Text className="text-center  font-semibold text-white">
                        Có
                      </Text>
                    </Button>
                    <Button
                      className="px-[1px] py-[2px] bg-[#AE1F17] mt-[12px] "
                      onPress={() => {
                        hideShowModal(index, 0);
                      }}
                    >
                      <Text className="text-center  font-semibold text-white">
                        Không
                      </Text>
                    </Button>
                  </Modal>
                </Portal>
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
    </PaperProvider>
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
export default ComboScreen;
