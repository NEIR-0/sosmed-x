import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../component/navbar";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NotificationsAll from "../component/notificationsAll";
import Verified from "../component/verified";
import Mentions from "../component/mentions";
import BtnAddPost from "../component/btnAddPost";
import { useState } from "react";
import AddPost from "./addPost";
import DetailProfiles from "./detailProfiles";

const Tab = createMaterialTopTabNavigator();

export default function Notifications() {
  const [show, setShow] = useState(false);
  const [profiles, setProfiles] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navbar text={"Notifications"} setProfiles={setProfiles} />
      {show === false ? "" : <AddPost setShow={setShow} />}
      <BtnAddPost setShow={setShow} />
      {profiles === true ? (
        <DetailProfiles setProfiles={setProfiles} />
      ) : (
        <Tab.Navigator>
          <Tab.Screen name="All" component={NotificationsAll} />
          <Tab.Screen name="Verified" component={Verified} />
          <Tab.Screen name="Mentions" component={Mentions} />
        </Tab.Navigator>
      )}
    </SafeAreaView>
  );
}
