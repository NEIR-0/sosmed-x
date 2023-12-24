import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../component/navbar";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Posts from "../component/post";
import Following from "../component/following";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AddPost from "./addPost";
import { useState } from "react";
import BtnAddPost from "../component/btnAddPost";
import DetailPost from "./detailPost";
import DetailProfiles from "./detailProfiles";

const Tab = createMaterialTopTabNavigator();

export default function HomePage() {
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState(false);
  const [profiles, setProfiles] = useState(false);

  const [idPost, setIdPost] = useState("");

  const handlerDetailPost = (_id) => {
    // console.log(_id);
    setIdPost(_id);
    setDetail(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <Navbar text={"logo"} setProfiles={setProfiles} />
      {show === false ? "" : <AddPost setShow={setShow} />}
      {detail === false ? (
        ""
      ) : (
        <DetailPost setDetail={setDetail} idPost={idPost} />
      )}
      {profiles === true ? <DetailProfiles setProfiles={setProfiles} /> : ""}

      <BtnAddPost setShow={setShow} />
      {/* tab */}
      {profiles === false ? (
        <Tab.Navigator>
          <Tab.Screen
            name="For You"
            //Following
            component={Following}
          />
          <Tab.Screen
            name="Following"
            component={Posts}
            initialParams={{ handlerDetailPost }}
          />
        </Tab.Navigator>
      ) : (
        ""
      )}
    </SafeAreaView>
  );
}
