import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../component/navbar";
import BtnAddPost from "../component/btnAddPost";
import { useState } from "react";
import AddPost from "./addPost";
import DetailProfiles from "./detailProfiles";
export default function Message() {
  const [show, setShow] = useState(false);
  const [profiles, setProfiles] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Navbar text={"Search Direct Message"} setProfiles={setProfiles} />
      {show === false ? "" : <AddPost setShow={setShow} />}
      <BtnAddPost setShow={setShow} />
      {profiles === true ? <DetailProfiles setProfiles={setProfiles} /> : ""}

      <View
        style={{
          flex: 1,
          // backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            // backgroundColor: "blue",
            width: "100%",
            padding: "10%",
          }}
        >
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>
            Welcome to your inbox!
          </Text>
          <Text style={{ marginTop: 10, marginBottom: 20, color: "gray" }}>
            Drop a line, shere posts and more with private conversations
            betweemn you and others on X
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 100,
              width: "70%",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
              Write Message
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
