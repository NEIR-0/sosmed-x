import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import DetailProfiles from "./detailProfiles";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* Custom Header */}
      <View
        style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: "#ddd" }}
      >
        {/* profiles */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 50, height: 50, borderRadius: 100 }}
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
          <View style={{ borderWidth: 2, borderRadius: 100, padding: 1 }}>
            <Feather name="more-vertical" size={20} color="black" />
          </View>
        </View>
        {/* username */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Neiro-0</Text>
          <Text style={{ fontSize: 20 }}>@neiro-20</Text>
        </View>
        {/* follow */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ fontSize: 15, marginRight: 10 }}>
            <Text style={{ fontWeight: "bold" }}>11 </Text>
            Following
          </Text>
          <Text style={{ fontSize: 15 }}>
            <Text style={{ fontWeight: "bold" }}>11 </Text>Follower
          </Text>
        </View>
      </View>

      {/* Drawer Items */}
      <DrawerItemList {...props} />
      <View style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Ionicons name="person-outline" size={20} color="black" />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>
            Premium
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Ionicons name="person-outline" size={20} color="black" />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>
            Premium
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Ionicons name="person-outline" size={20} color="black" />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>
            Premium
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Ionicons name="person-outline" size={20} color="black" />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>
            Premium
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Ionicons name="person-outline" size={20} color="black" />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>
            Premium
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            // marginBottom: 20,
          }}
        >
          <Ionicons name="person-outline" size={20} color="black" />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>
            Premium
          </Text>
        </View>
      </View>

      {/* Custom Footer */}
      <View
        style={{ padding: 20, borderTopWidth: 1, borderBottomColor: "#ddd" }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Professional Tools
          </Text>
          <AntDesign name="down" size={20} color="black" />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Setting & Support
          </Text>
          <AntDesign name="down" size={20} color="black" />
        </View>
        <View>
          <Feather name="sun" size={25} color="black" />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const CustomHeader = ({ navigation, route }) => {
  // console.log(route);
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        {route.name === "Profiles" ? (
          <View
            style={{
              backgroundColor: "red",
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const CustomHomePage = () => {
  <SafeAreaView style={{ backgroundColor: "red", flex: 1 }}>
    <Text>verified</Text>
  </SafeAreaView>;
};
export default function Profiles() {
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
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Login" component={CustomHomePage} />
        {/* <Drawer.Screen name="Profiles" component={DetailProfiles} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
