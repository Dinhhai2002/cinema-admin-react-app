import { useRoute } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import bannerApi from "../apis/banner.api";
import { Banner } from "../types/banner.type";

function BannerEdit() {
  const [file, setFile] = useState<any>();
  const [result, setResult] = useState<any>();
  const [Type, setType] = React.useState("");
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const { params } = useRoute();

  const banner = (params as any).banner as Banner;
  const refetch = (params as any).refetch as any;

  useEffect(() => {
    setTitle(banner.title);
  }, []);
  const updateBanner = useMutation({
    mutationKey: ["banner"],
    mutationFn: (body: any) =>
      bannerApi.updateBanner(banner?._id as string, body),
  });

  // Stores any error message

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera  
             roll permission to upload images.`
      );
    } else {
      const result: any = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
        setResult(result);
        setFile(result.assets[0].uri);
        setType(
          result.assets[0].uri.substring(
            result.assets[0].uri.lastIndexOf(".") + 1
          )
        );

        // Clear any previous errors
        setError(null);
      }
    }
  };

  const handleUpdateBanner = () => {
    // const data = new FormData();
    // const blob = new Blob(
    //   [
    //     {
    //       name: "image",
    //       type: "image/png",
    //       uri: Platform.OS === "android" ? file : file.replace("file://", ""),
    //     }.uri,
    //   ],
    //   { type: "image/png" }
    // );
    // const upload = {
    //   image: file,
    //   name: "myimage.jpg",
    //   type: "image/jpg",
    // };
    // data.append("title", title);
    // // data.append("image", file);
    // data.append("file", blob);
    // // new File([file], "logo.png")
    const body = {
      title: title,
    };

    updateBanner.mutate(body, {
      onSuccess: () => {
        refetch();
        Toast.show({
          type: "success",
          text1: "Chỉnh sửa thành công!",
        });
      },
      onError: (error) => {
        console.log(error);

        Toast.show({
          type: "error",
          text1: `${error}`,
        });
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chỉnh sửa banner</Text>

      <Text style={styles.label}>Tên tiêu đề</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Banner</Text>
      <TextInput
        style={styles.input}
        value={banner.file}
        // onChangeText={setUsername}
      />
      {/* <Text style={styles.label}>Cập nhật hình ảnh</Text>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>
      <View style={styles.containerImage}>
        {file ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: file }} style={styles.image} />
          </View>
        ) : (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>
*/}
      <TouchableOpacity style={styles.button} onPress={handleUpdateBanner}>
        <Text style={styles.buttonText}>Cập nhật banner</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 60,
  },
  containerImage: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 16,
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
  imageContainer: {
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    marginTop: 16,
  },
  button: {
    backgroundColor: "#AE1F17",
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
    textAlign: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BannerEdit;
