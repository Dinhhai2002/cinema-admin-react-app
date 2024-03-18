import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { PencilSquareIcon } from "react-native-heroicons/outline";
import { Avatar, Button, DataTable } from "react-native-paper";
import bannerApi from "../apis/banner.api";
import Pagination from "../components/Pagination";
import { Banner } from "../types/banner.type";

const BannerScreen = () => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [totalRecord, setTotalRecord] = useState<number>(20);
  const [showing, setShowing] = useState<Banner[]>([]);

  const navigation = useNavigation<any>();
  const handleClick = () => {
    navigation.navigate("BannerEdit");
  };

  const { data: dataShowing, isLoading: isLoadingShowing } = useQuery({
    queryKey: ["showing"],
    queryFn: () => {
      return bannerApi.getBanners();
    },
    staleTime: 3 * 60 * 1000,
  });

  useEffect(() => {
    setShowing(dataShowing?.data.data as Banner[]);
  }, [dataShowing]);

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Tiêu đề</DataTable.Title>
          <DataTable.Title>Banner</DataTable.Title>
          <DataTable.Title>Hành động</DataTable.Title>
        </DataTable.Header>
        {showing &&
          showing.map((banner: Banner) => (
            <DataTable.Row key={banner._id} style={styles.rowTable}>
              <DataTable.Cell style={{ marginRight: 10 }}>
                {banner.title}
              </DataTable.Cell>
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
                    navigation.navigate("BannerEdit", { banner: banner })
                  }
                >
                  <PencilSquareIcon size="30" strokeWidth={2} color="#AE1F17" />
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
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
  rowTable: {
    marginVertical: 10,
    padding: 10,
  },
});

export default BannerScreen;
