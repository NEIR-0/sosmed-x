import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Navbar from "../component/navbar";
import BtnAddPost from "../component/btnAddPost";
import { useState } from "react";
import AddPost from "./addPost";
import DetailProfiles from "./detailProfiles";

const textList = [
  {
    img: "https://source.unsplash.com/random/300x600?sig=food",
    title: "Food Hub",
    member: "6,901",
    imgUser1: "https://source.unsplash.com/random/300x600?sig=people",
    imgUser2: "https://source.unsplash.com/random/300x600?sig=art",
    imgUser3: "https://source.unsplash.com/random/300x600?sig=car",
  },
  {
    img: "https://source.unsplash.com/random/300x600?sig=forest",
    title: "Love Forest",
    member: "11,021",
    imgUser1: "https://source.unsplash.com/random/300x600?sig=tech",
    imgUser2: "https://source.unsplash.com/random/300x600?sig=female",
    imgUser3: "https://source.unsplash.com/random/300x600?sig=male",
  },
  {
    img: "https://source.unsplash.com/random/300x600?sig=Fashion",
    title: "Fashion World",
    member: "22,901",
    imgUser1: "https://source.unsplash.com/random/300x600?sig=phone",
    imgUser2: "https://source.unsplash.com/random/300x600?sig=model",
    imgUser3: "https://source.unsplash.com/random/300x600?sig=costume",
  },
  {
    img: "https://source.unsplash.com/random/300x600?sig=view",
    title: "Beauty View",
    member: "9,901",
    imgUser1: "https://source.unsplash.com/random/300x600?sig=sport",
    imgUser2: "https://source.unsplash.com/random/300x600?sig=gym",
    imgUser3: "https://source.unsplash.com/random/300x600?sig=beach",
  },
  {
    img: "https://source.unsplash.com/random/300x600?sig=fantasy",
    title: "Anime For Live",
    member: "33,829",
    imgUser1: "https://source.unsplash.com/random/300x600?sig=animeguy",
    imgUser2: "https://source.unsplash.com/random/300x600?sig=drawing",
    imgUser3: "https://source.unsplash.com/random/300x600?sig=foto",
  },
  {
    img: "https://source.unsplash.com/random/300x600?sig=dog",
    title: "Dog Lover",
    member: "5,765",
    imgUser1: "https://source.unsplash.com/random/300x600?sig=puppy",
    imgUser2: "https://source.unsplash.com/random/300x600?sig=person",
    imgUser3: "https://source.unsplash.com/random/300x600?sig=sunset",
  },
  {
    img: "https://source.unsplash.com/random/300x600?sig=book",
    title: "Book Story",
    member: "6,901",
    imgUser1: "https://source.unsplash.com/random/300x600?sig=pumpkin",
    imgUser2: "https://source.unsplash.com/random/300x600?sig=vegetable",
    imgUser3: "https://source.unsplash.com/random/300x600?sig=rubber",
  },
  {
    img: "https://source.unsplash.com/random/300x600?sig=money",
    title: "How To Make Money",
    member: "101,778",
    imgUser1: "https://source.unsplash.com/random/300x600?sig=rich",
    imgUser2: "https://source.unsplash.com/random/300x600?sig=gems",
    imgUser3: "https://source.unsplash.com/random/300x600?sig=glasses",
  },
  {
    img: "https://source.unsplash.com/random/300x600?sig=gym",
    title: "Sporty Live",
    member: "7,672",
    imgUser1: "https://source.unsplash.com/random/300x600?sig=women",
    imgUser2: "https://source.unsplash.com/random/300x600?sig=man",
    imgUser3: "https://source.unsplash.com/random/300x600?sig=muscle",
  },
];

export default function Community() {
  const [show, setShow] = useState(false);
  const [profiles, setProfiles] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Navbar text={"Communities"} setProfiles={setProfiles} />
      {show === false ? "" : <AddPost setShow={setShow} />}
      <BtnAddPost setShow={setShow} />
      {profiles === true ? <DetailProfiles setProfiles={setProfiles} /> : ""}

      <View
        style={{
          paddingHorizontal: "3%",
          marginTop: "4%",
        }}
      >
        {/* title */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "5%",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Discover New Communities
          </Text>
          <Feather name="more-vertical" size={20} color="black" />
        </View>
        {/* list communities */}
        <ScrollView>
          {/* cover */}
          {textList &&
            textList.map((el) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    // backgroundColor: "red",
                    marginBottom: "5%",
                  }}
                >
                  {/* image */}
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={{
                      uri: el.img,
                    }}
                  />

                  {/* des */}
                  <View
                    style={{
                      marginLeft: "5%",
                      // backgroundColor: "red",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        {el.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          // fontWeight: "bold",
                        }}
                      >
                        {el.member} Members
                      </Text>
                    </View>
                    {/* member */}
                    <View style={{ flexDirection: "row", width: 20 }}>
                      <Image
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 100,
                          zIndex: 2,
                        }}
                        source={{
                          uri: el.imgUser1,
                        }}
                      />
                      <Image
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 100,
                          marginLeft: -10,
                          zIndex: 1,
                        }}
                        source={{
                          uri: el.imgUser2,
                        }}
                      />
                      <Image
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 100,
                          marginLeft: -10,
                        }}
                        source={{
                          uri: el.imgUser3,
                        }}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
