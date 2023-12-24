import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PostedUser from "../component/postsuser";
import Liked from "../component/liked";
import Replies from "../component/replies";
import Hieghlights from "../component/hieghlights";
import Media from "../component/media";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../context/isLogin";
const Tab = createMaterialTopTabNavigator();

const USER_FOLLOW = gql`
  query DetailUser {
    detailUser {
      _id
      name
      username
      email
      password
    }
    follower {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
    following {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;

export default function DetailProfiles({ setProfiles }) {
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [user, setUser] = useState([]);
  const { LogoutActions } = useContext(LoginContext);

  const { loading, error, data } = useQuery(USER_FOLLOW);
  console.log(loading, error, data);
  // const following = useQuery(FOLLOWING);
  useEffect(() => {
    if (data) {
      setUserFollowers(data.follower);
      setUserFollowing(data.following);
      setUser(data.detailUser);
    }
  }, [data]);
  return (
    <SafeAreaView
      style={{
        width: "100%",
        backgroundColor: "white",
        alignItems: "center",
        position: "absolute",
        zIndex: 20,
      }}
    >
      {/* headers */}
      <View
        style={{
          position: "relative",
          width: "100%",
          height: 150,
          backgroundColor: "blue",
        }}
      >
        <View
          style={{
            position: "absolute",
            zIndex: 2,
            //   backgroundColor: "red",
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          {/* back */}
          <TouchableWithoutFeedback
            onPress={() => {
              setProfiles(false);
            }}
          >
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                width: "auto",
                padding: 10,
                borderRadius: 100,
              }}
            />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 2,
            //   backgroundColor: "red",
            paddingHorizontal: 10,
            paddingVertical: 5,
            flexDirection: "row",
          }}
        >
          {/* search */}
          <AntDesign
            name="search1"
            size={24}
            color="black"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              width: "auto",
              padding: 10,
              borderRadius: 100,
              marginRight: 10,
            }}
          />
          {/* logout */}
          <TouchableWithoutFeedback
            onPress={() => {
              LogoutActions("token");
            }}
          >
            <AntDesign
              name="logout"
              size={24}
              color="black"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                width: "auto",
                padding: 10,
                borderRadius: 100,
                marginRight: 10,
              }}
            />
          </TouchableWithoutFeedback>
        </View>
        {/* bg profiles */}
        <Image
          style={{ width: "100%", height: 150 }}
          source={{
            uri: "https://source.unsplash.com/random/300x600?sig=background",
          }}
        />
      </View>
      {/* profiles */}
      <View
        style={{
          // backgroundColor: "green",
          paddingHorizontal: 20,
          paddingTop: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Image
          style={{
            width: 90,
            height: 90,
            borderWidth: 5,
            borderColor: "white",
            borderRadius: 100,
            marginTop: -60,
          }}
          source={{
            uri: "https://source.unsplash.com/random/300x600?sig=people",
          }}
        />
        <TouchableOpacity
          style={{
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderWidth: 1,
            borderRadius: 100,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Edit Profiles</Text>
        </TouchableOpacity>
      </View>
      {/* name */}
      <View style={{ paddingHorizontal: 20, width: "100%" }}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          {user && user.name}
        </Text>
        <Text style={{ fontSize: 20 }}>@{user && user.username}</Text>
      </View>
      {/* des */}
      <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
        <Text
          style={{ fontSize: 15, textAlign: "justify", fontWeight: "bold" }}
        >
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
        </Text>
      </View>
      {/* decoration */}
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Ionicons name="ios-location-outline" size={15} color="black" />
        <Text style={{ fontSize: 15, marginLeft: 5 }}>Indonesia, Jakarta</Text>
        <FontAwesome
          name="unlink"
          size={15}
          color="black"
          style={{ marginLeft: 20 }}
        />
        <Text style={{ fontSize: 15, marginLeft: 5 }}>linkIn.id</Text>
      </View>
      <View
        style={{
          paddingHorizontal: 23,
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <FontAwesome name="map-pin" size={15} color="black" />
        <Text style={{ fontSize: 15, marginLeft: 5 }}>Born, March 27,2000</Text>
        <FontAwesome
          name="calendar"
          size={15}
          color="black"
          style={{ marginLeft: 20 }}
        />
        <Text style={{ fontSize: 15, marginLeft: 5 }}>Joined April 2021</Text>
      </View>

      {/* followers */}
      <View
        style={{
          width: "100%",
          paddingHorizontal: "5%",
          // backgroundColor: "blue",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 15, marginRight: 20 }}>
            {userFollowing && userFollowing.length} following
          </Text>
          <Text style={{ fontSize: 15 }}>
            {userFollowers && userFollowers.length} followers
          </Text>
        </View>
      </View>
      <View style={{ height: 400, marginTop: 10 }}>
        <Tab.Navigator
          tabBarOptions={{
            scrollEnabled: true,
          }}
        >
          <Tab.Screen name="Posts" component={PostedUser} />
          <Tab.Screen name="Replies" component={Replies} />
          <Tab.Screen name="Hieghlights" component={Hieghlights} />
          <Tab.Screen name="Media" component={Media} />
          <Tab.Screen name="Liked" component={Liked} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}
