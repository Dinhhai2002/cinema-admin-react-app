import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import TopMovie from "../components/TopMovie";
import { Banner } from "../types/banner.type";

function BannerEdit() {
  const { params } = useRoute();

  const banner = (params as any).banner as Banner;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chỉnh sửa banner</Text>

      <Text style={styles.label}>Tên tiêu đề</Text>
      <TextInput style={styles.input} value={banner.title} />

      <Text style={styles.label}>Banner</Text>
      <TextInput
        style={styles.input}
        value={banner.file}
        // onChangeText={setUsername}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 60,
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

export default BannerEdit;
