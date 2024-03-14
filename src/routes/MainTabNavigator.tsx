import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoadMore from "../screens/Banner";
import MovieScreen from "../screens/Movie";
import {
  HomeIcon,
  FilmIcon,
  UserCircleIcon,
  PhotoIcon,
  BuildingLibraryIcon
} from "react-native-heroicons/outline";
import React from "react";
import HomeScreen from "../screens/Home";
import BannerScreen from "../screens/Banner";
import UserScreen from "../screens/User";
import ComboScreen from "../screens/Combo";

const Tab = createBottomTabNavigator();

const Tabs = [
  {
    tabBarLabel: "Home",
    nameIcon: <HomeIcon size="30" strokeWidth={2} color="#AE1F17" />,
    name: `Home`,
    component: HomeScreen,
  },
  {
    tabBarLabel: "Movie",
    nameIcon: <FilmIcon size="30" strokeWidth={2} color="#AE1F17" />,
    name: "Movie",
    component: MovieScreen,
  },
  {
    tabBarLabel: "User",
    nameIcon: <UserCircleIcon size="30" strokeWidth={2} color="#AE1F17" />,
    name: "User",
    component: UserScreen,
  },
  {
    tabBarLabel: "Banner",
    nameIcon: <PhotoIcon size="30" strokeWidth={2} color="#AE1F17" />,
    name: "Banner",
    component: BannerScreen,
  },
  {
    tabBarLabel: "Combo",
    nameIcon: <BuildingLibraryIcon size="30" strokeWidth={2} color="#AE1F17" />,
    name: "Combo",
    component: ComboScreen,
  },
];

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={"LoadMore"}
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        headerShown: false,
      }}
    >
      {Tabs.map((item, index) => (
        <Tab.Screen
          key={index}
          options={{
            tabBarLabel: item.tabBarLabel,
            tabBarIcon: ({ color, size }) => item.nameIcon,
          }}
          name={item.name}
          component={item.component}
        />
      ))}
    </Tab.Navigator>
  );
};
export default MainTabNavigator;
