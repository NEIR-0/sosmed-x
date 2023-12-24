import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  createBottomTabNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import Login from "./login";
import Register from "./register";
import HomePage from "./homePage";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "../component/navbar";
import { SafeAreaView } from "react-native-safe-area-context";
import DetailPost from "./detailPost";
import DetailProfiles from "./detailProfiles";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const CustomHeader = ({ navigation, route }) => {
  // console.log(route);
  return (
    <SafeAreaView style={{ width: "100%", backgroundColor: "green" }}>
      <Navbar text={"logo"} navigation={navigation} />
      {/* <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>+</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomePage") {
            iconName = focused ? "home" : "home";
          }
          // search
          else if (route.name === "SearchUser") {
            iconName = focused ? "search" : "search";
          }
          // search
          else if (route.name === "SearchUser") {
            iconName = focused ? "home" : "home";
          }
          // Community
          else if (route.name === "Community") {
            iconName = focused ? "user" : "user";
          }
          // Notifications
          else if (route.name === "Notifications") {
            iconName = focused ? "bell" : "bell";
          }
          // Message
          else if (route.name === "Message") {
            iconName = focused ? "comment" : "comment";
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{ tabBarShowLabel: false, headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default function Test() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerPosition="left"
        drawerType="front"
        drawerStyle={{ width: "70%" }}
        drawerContentOptions={{
          activeTintColor: "#3498db",
          itemStyle: { marginVertical: 5 },
        }}
        screenOptions={{ header: CustomHeader }}
      >
        <Drawer.Screen name="Home" component={HomeTabs} />
        <Drawer.Screen name="Profile" component={DetailProfiles} />
        {/* <Drawer.Screen name="Settings" component={Register} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
