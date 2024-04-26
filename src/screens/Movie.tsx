import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
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
import movieApi from "../apis/movie.api";
import { Params } from "../apis/user.api";
import Pagination from "../components/Pagination";
import { Movie } from "../types/movie.type";

const MovieScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState<number | null>(null);

  const containerStyle = { backgroundColor: "white", padding: 20 };

  const navigation = useNavigation<any>();

  const queryConfig = {
    page: currentPage,
    page_size: pageSize,
    key_search: keyword,
    role: role,
  };
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["movie", queryConfig],
    queryFn: () => movieApi.getMovies(queryConfig as Params),
    staleTime: 3 * 60 * 1000,
  });

  const deleteMovie = useMutation({
    mutationKey: ["movie"],
    mutationFn: (body: string[]) => movieApi.deleteMovie(body),
  });

  React.useEffect(() => {
    refetch();
  }, []);

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
  const handleSubmit = (movie: Movie, index: number) => {
    deleteMovie.mutate([movie._id] as string[], {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Thay đổi trạng thái phim thành công!",
        });
        refetch();
      },
      onError: (error) => {},
    });
    hideShowModal(index, 0);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Danh sách phim</Text>
        <Searchbar
          placeholder="Tìm kiếm"
          onChangeText={setKeyword}
          value={keyword}
        />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Tên</DataTable.Title>
            <DataTable.Title>Poster</DataTable.Title>
            <DataTable.Title>thời lượng</DataTable.Title>
            <DataTable.Title numeric>ngày phát hành</DataTable.Title>
            <DataTable.Title numeric>cập nhật</DataTable.Title>
            <DataTable.Title numeric>Xóa</DataTable.Title>
          </DataTable.Header>

          {dataTable &&
            dataTable?.map((movie, index) => (
              <DataTable.Row key={movie._id}>
                <DataTable.Cell>{movie.name}</DataTable.Cell>
                <DataTable.Cell>
                  <Image
                    source={{
                      uri: `${movie.poster}`,
                    }}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  />
                </DataTable.Cell>
                <DataTable.Cell>{movie.duration}</DataTable.Cell>
                <DataTable.Cell>{movie.release}</DataTable.Cell>

                <DataTable.Cell>
                  <Button
                    onPress={() =>
                      navigation.navigate("MovieEdit", {
                        movie: movie,
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
                      Bạn có chắc chắn thay đổi trạng thái phim "{movie.name}" ?
                    </Text>
                    <Button
                      className="px-[1px] py-[2px] bg-[#AE1F17] mt-[12px] "
                      onPress={() => {
                        handleSubmit(movie, index);
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

export default MovieScreen;
