import { useRoute } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import comboApi from "../apis/combo.api";
import { Combo, comboType } from "../types/combo.type";

function ComboEdit() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  //   const [movie, setMovie] = useState<any>({});

  const { params } = useRoute();
  const combo = (params as any).combo as Combo;
  const refetch = (params as any).refetch as any;

  useEffect(() => {
    setName(combo.name);
    setPrice(`${combo.price}`);
    setDescription(combo.description);
  }, []);

  const updateCombo = useMutation({
    mutationKey: ["movie"],
    mutationFn: (body: any) => comboApi.updateCombo(combo._id as string, body),
  });

  const handleUpdate = () => {
    const body = {
      ...combo,
      name: name,
      description: description,
      price: Number(price),
    };
    updateCombo.mutate(body, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Chỉnh sửa thành công!",
        });
        refetch();
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error}`,
        });
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Chỉnh sửa combo</Text>

        <Text style={styles.label}>Tên combo</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>giá</Text>
        <TextInput style={styles.input} value={price} onChangeText={setPrice} />

        <Text style={styles.label}>Loại</Text>
        <TextInput
          style={styles.input}
          value={comboType[combo.type - 1]}
          readOnly
        />

        <Text style={styles.label}>mô tả</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity
          className="px-[16px] py-[12px] bg-[#AE1F17] rounded-lg mb-[12px] mt-[24px] "
          onPress={handleUpdate}
        >
          <Text className="text-center text-[16px] font-semibold text-white">
            Cập nhật combo
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 80,
  },
  listContainer: {
    paddingHorizontal: 5,
    margin: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#A9A9A9",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
});

export default ComboEdit;
