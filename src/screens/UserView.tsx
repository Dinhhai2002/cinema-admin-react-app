import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Modal, PaperProvider, Portal } from "react-native-paper";
import userApi from "../apis/user.api";
import { User } from "../types/user.type";
import { useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

function UserView() {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const { params } = useRoute();
  const navigation = useNavigation<any>();
  const user = (params as any).user as User;

  const deleteUser = useMutation({
    mutationKey: ["user"],
    mutationFn: (body: string[]) => userApi.deleteUser(body),
  });

  const handleSubmit = () => {
    deleteUser.mutate([user._id] as string[], {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Thay đổi trạng thái người dùng thành công!",
        });
      },
      onError: (error) => {},
    });

    hideModal();
  };
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Thông tin user</Text>

        <Text style={styles.label}>Tên người đùng</Text>
        <TextInput style={styles.input} value={user.name} />

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput style={styles.input} value={user.phone} />

        <Text style={styles.label}>email</Text>
        <TextInput style={styles.input} value={user.email} />

        <View className="flex justify-between align-middle">
          <TouchableOpacity
            className="px-[16px] py-[12px] bg-[#AE1F17] rounded-lg mb-[12px] mt-[12px] "
            onPress={showModal}
          >
            <Text className="text-center text-[16px] font-semibold text-white">
              Thay đổi trạng thái người dùng
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-[16px] py-[12px] bg-[#AE1F17] rounded-lg mb-[24px]"
            onPress={() => {
              navigation.navigate("UserScreen");
            }}
          >
            <Text className="text-center text-[16px] font-semibold text-white">
              Thoát
            </Text>
          </TouchableOpacity>
        </View>

        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text className="px-[1px] py-[1px] font-semibold  ">
              Bạn có chắc chắn thay đổi trạng thái người dùng.
            </Text>
            <Button
              className="px-[1px] py-[2px] bg-[#AE1F17] mt-[12px] "
              onPress={handleSubmit}
            >
              <Text className="text-center  font-semibold text-white">Có</Text>
            </Button>
            <Button
              className="px-[1px] py-[2px] bg-[#AE1F17] mt-[12px] "
              onPress={hideModal}
            >
              <Text className="text-center  font-semibold text-white">
                Không
              </Text>
            </Button>
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
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

export default UserView;
