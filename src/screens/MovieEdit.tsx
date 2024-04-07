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
import movieApi from "../apis/movie.api";
import { Movie } from "../types/movie.type";
import { formatDate } from "../utils/utils";

function MovieEdit() {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [director, setDirector] = useState("");
  const [performer, setPerformer] = useState("");
  const [description, setDescription] = useState("");
  //   const [movie, setMovie] = useState<any>({});

  const { params } = useRoute();
  const movie = (params as any).movie as Movie;
  const refetch = (params as any).refetch as any;

  useEffect(() => {
    setName(movie.name);
    setDuration(movie.duration);
    setDirector(movie.director);
    setPerformer(movie.performer);
    setDescription(movie.description);
  }, []);

  const updateMovie = useMutation({
    mutationKey: ["movie"],
    mutationFn: (body: any) => movieApi.updateMovie(movie._id as string, body),
  });

  const handleUpdate = () => {
    const {
      poster,
      thumbnail,
      updated_at,
      created_at,
      _id,
      genre_ids,
      ...rest
    } = movie;
    const body = {
      ...rest,
      name: name,
      genres: Object(genre_ids).join(", "),
      release: formatDate(movie.release),
      duration: duration,
      director: director,
      performer: performer,
      description: description,
    };

    updateMovie.mutate(body, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Chỉnh sửa thành công!",
        });
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error}`,
        });
      },
    });
    refetch();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Chỉnh sửa banner</Text>

        <Text style={styles.label}>Tên phim</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Thời lượng</Text>
        <TextInput
          style={styles.input}
          value={duration}
          onChangeText={setDuration}
        />

        <Text style={styles.label}>Thời gian phát hành</Text>
        <TextInput style={styles.input} value={movie.release} readOnly />

        <Text style={styles.label}>Tác giả</Text>
        <TextInput
          style={styles.input}
          value={director}
          onChangeText={setDirector}
        />

        <Text style={styles.label}>Diễn viên</Text>
        <TextInput
          style={styles.input}
          value={performer}
          onChangeText={setPerformer}
        />

        <Text style={styles.label}>Thể loại</Text>
        <TextInput style={styles.input} value={movie.genres} readOnly />

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
            Cập nhật phim
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

export default MovieEdit;
