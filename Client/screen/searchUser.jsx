import {
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Navbar from "../component/navbar";
import BtnAddPost from "../component/btnAddPost";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import CardUser from "../component/listUser";
import AddPost from "./addPost";
import DetailProfiles from "./detailProfiles";
import { AntDesign } from "@expo/vector-icons";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    uri: "https://source.unsplash.com/random/300x600?sig=vacation",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    uri: "https://source.unsplash.com/random/300x600?sig=beach",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    uri: "https://source.unsplash.com/random/300x600?sig=forest",
  },
];

const LIST_USER = gql`
  query Serach($search: seachBar) {
    serach(search: $search) {
      _id
      name
      username
      email
      password
    }
  }
`;

const Item = ({ uri }) => (
  <View
    style={{
      marginVertical: 8,
      marginRight: 20,
      borderRadius: 20,
      overflow: "hidden",
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <AntDesign
      name="playcircleo"
      size={50}
      color="white"
      style={{ position: "absolute", zIndex: 10 }}
    />
    <Image
      style={{ width: 150, height: 200 }}
      source={{
        uri: uri,
      }}
    />
  </View>
);

const textList = [
  {
    location: "Norwegia",
    title: "Ultramen datang!",
  },
  {
    location: "Ukraine",
    title: "Genosidasi gameplay",
  },
  {
    location: "Indonesia",
    title: "Pandu terganteng",
  },
  {
    location: "Jepang",
    title: "Gundam is ReAL",
  },
  {
    location: "America",
    title: "Joki Minyak",
  },
];

export default function SearchUser() {
  const [show, setShow] = useState(false);
  const [listUser, setListUser] = useState(false);
  const [form, setForm] = useState({
    searching: "",
  });
  const [findUser, setFindUser] = useState(false);
  const [profiles, setProfiles] = useState(false);

  const searchUser = async (name, value) => {
    // console.log(name, value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  // query
  const { loading, error, data, refetch } = useQuery(LIST_USER, {
    variables: {
      search: form,
    },
  });

  const submitName = async () => {
    try {
      console.log(form);
      console.log(loading, error, data);
      refetch();
      setFindUser(data.serach);
      setListUser(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, position: "relative", backgroundColor: "white" }}
    >
      <Navbar
        text={"Search"}
        searchUser={searchUser}
        submitName={submitName}
        setProfiles={setProfiles}
      />
      {profiles === true ? <DetailProfiles setProfiles={setProfiles} /> : ""}
      {show === false ? "" : <AddPost setShow={setShow} />}
      <BtnAddPost setShow={setShow} />
      {listUser === true ? (
        <ScrollView
          style={{
            position: "absolute",
            width: "100%",
            height: "120%",
            marginTop: 20,
            backgroundColor: "white",
            zIndex: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 600,
              // backgroundColor: "green"
            }}
          >
            <Navbar
              text={"Search"}
              searchUser={searchUser}
              submitName={submitName}
            />
          </View>
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              marginTop: "-131%",
              paddingTop: "2%",
            }}
          >
            {/* back */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 110,
                  paddingVertical: 5,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setListUser(false);
                }}
              >
                <Ionicons name="arrow-back" size={23} color="black" />
                <Text style={{ fontSize: 20, marginLeft: 6 }}>back</Text>
              </TouchableOpacity>
            </View>

            {/* user */}
            {findUser &&
              findUser.map((el) => {
                return <CardUser key={el.id} data={el} />;
              })}
          </View>
        </ScrollView>
      ) : (
        ""
      )}

      <View
        style={{
          paddingHorizontal: "3%",
          marginTop: "4%",
          backgroundColor: "white",
        }}
      >
        {/* title */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // marginBottom: "5%",
          }}
        ></View>

        <ScrollView>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            Trends For You
          </Text>
          {/* trends */}
          {textList &&
            textList.map((el) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 20,
                    // backgroundColor: "red",
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 15 }}>
                      Trending di {el.location}
                    </Text>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {el.title}
                    </Text>
                  </View>
                  <Feather name="more-vertical" size={20} color="black" />
                </View>
              );
            })}
          {/* showmore trends */}
          <Text style={{ paddingVertical: 20, fontSize: 20, color: "blue" }}>
            Show more
          </Text>
          {/* video for you */}

          <View
            style={{
              borderTopWidth: 0.2,
              borderColor: "gray",
              marginBottom: "20%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                backgroundColor: "white",
                marginTop: "5%",
              }}
            >
              Videos For You
            </Text>
            <Text style={{ fontSize: 15 }}>
              Checkout this popular videos for you
            </Text>

            {/* videos */}
            <ScrollView>
              <FlatList
                data={DATA}
                horizontal
                renderItem={({ item }) => <Item uri={item.uri} />}
                keyExtractor={(item) => item.id}
              />
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
