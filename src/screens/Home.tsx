import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import TopMovie from "../components/TopMovie";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: "Doanh thu",
      total: 1000000,
      backgroundColor: "#ffdcb2",
      titleColor: "#ff8c00",
    },
    {
      id: 2,
      title: "Phim đang chiếu",
      total: 18,
      backgroundColor: "#bfdfdf",
      titleColor: "#008080",
    },
    {
      id: 3,
      title: "Phim sắp chiếu",
      total: 20,
      backgroundColor: "#e2caf8",
      titleColor: "#8a2be2",
    },
    {
      id: 4,
      title: "Tổng người dùng",
      total: 30,
      backgroundColor: "#d8e4fa",
      titleColor: "#6495ed",
    },
  ]);

  const renderAppointmentCard = ({ item }: any) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: item.backgroundColor,
          borderTopWidth: 4,
          borderTopColor: item.titleColor,
        },
      ]}
    >
      <Text style={[styles.cardTitle, { color: item.titleColor }]}>
        {item.title}
      </Text>
      <View style={styles.cardDates}>
        <Text style={styles.cardDate}> {item.total}</Text>
      </View>
      <View style={styles.cardContent}></View>
    </View>
  );

  // const searchFilter = (item: any) => {
  //   const query = searchQuery.toLowerCase();
  //   return item.title.toLowerCase().includes(query);
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cinema</Text>
      <FlatList
        contentContainerStyle={styles.listContainer}
        // data={appointments.filter(searchFilter)}
        data={appointments}
        renderItem={renderAppointmentCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
      <TopMovie />
    </View>
  );
};

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
  card: {
    flex: 1,
    marginBottom: 20,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  cardDates: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  cardDate: {
    color: "#888",
  },
  cardContent: {
    justifyContent: "space-between",
    paddingTop: 10,
  },
  attendeesContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  attendeeImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginLeft: -10,
    borderWidth: 0.5,
    marginTop: 3,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  actionButton: {
    marginTop: 15,
    backgroundColor: "#DCDCDC",
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#00008B",
    marginRight: 10,
  },
  buttonText: {
    color: "#00008B",
  },
});

export default HomeScreen;
