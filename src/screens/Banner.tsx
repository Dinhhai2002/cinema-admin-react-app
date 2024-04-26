import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { PencilSquareIcon, TrashIcon } from "react-native-heroicons/outline";
import {
  Avatar,
  Button,
  DataTable,
  Modal,
  PaperProvider,
  Portal,
} from "react-native-paper";
import Toast from "react-native-toast-message";
import bannerApi from "../apis/banner.api";
import Pagination from "../components/Pagination";
import { Banner } from "../types/banner.type";

const BannerScreen = () => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [totalRecord, setTotalRecord] = useState<number>(20);
  const [showing, setShowing] = useState<Banner[]>([]);

  const containerStyle = { backgroundColor: "white", padding: 20 };

  const navigation = useNavigation<any>();

  const {
    data: dataShowing,
    isLoading: isLoadingShowing,
    refetch,
  } = useQuery({
    queryKey: ["showing"],
    queryFn: () => {
      return bannerApi.getBanners();
    },
    staleTime: 3 * 60 * 1000,
  });

  const dataTable = dataShowing?.data.data;
  const total = dataShowing?.data.total_record;

  // useEffect(() => {
  //   setShowing(dataShowing?.data.data as Banner[]);
  // }, [dataShowing]);

  const [modalVisible, setModalVisible] = useState(
    new Array(dataTable?.length).fill(false)
  );
  const hideShowModal = (index: number, typeVisible: number) => {
    const newModalVisible = [...modalVisible];
    newModalVisible[index] = typeVisible === 1 ? true : false;
    setModalVisible(newModalVisible);
  };

  const deleteBanner = useMutation({
    mutationKey: ["banner"],
    mutationFn: (body: string[]) => bannerApi.deleteBanner(body),
  });

  const handleSubmit = (banner: Banner, index: number) => {
    deleteBanner.mutate([banner._id] as string[], {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Thay đổi trạng thái banner thành công!",
        });
      },
      onError: (error) => {},
    });
    hideShowModal(index, 0);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Tiêu đề</DataTable.Title>
            <DataTable.Title>Banner</DataTable.Title>
            <DataTable.Title style={{ marginRight: 10 }}>
              Chỉnh sửa
            </DataTable.Title>
            <DataTable.Title>Xóa</DataTable.Title>
          </DataTable.Header>
          {dataTable &&
            dataTable.map((banner: Banner, index: number) => (
              <DataTable.Row key={banner._id} style={styles.rowTable}>
                <DataTable.Cell>{banner.title}</DataTable.Cell>
                <DataTable.Cell>
                  <Image
                    source={{
                      uri: `${banner.file}`,
                    }}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  />
                </DataTable.Cell>
                <DataTable.Cell>
                  <Button
                    onPress={() =>
                      navigation.navigate("BannerEdit", {
                        banner: banner,
                        refetch: refetch,
                      })
                    }
                  >
                    <PencilSquareIcon
                      size="30"
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
                    <TrashIcon size="30" strokeWidth={2} color="#AE1F17" />
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
                      Bạn có chắc chắn thay đổi trạng thái banner "
                      {banner.title}" ?
                    </Text>
                    <Button
                      className="px-[1px] py-[2px] bg-[#AE1F17] mt-[12px] "
                      onPress={() => {
                        handleSubmit(banner, index);
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
  rowTable: {
    marginVertical: 10,
    padding: 10,
  },
});

export default BannerScreen;
