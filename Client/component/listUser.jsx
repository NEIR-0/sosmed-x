import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const FOLLOWING = gql`
  mutation UserFollowing($following: Followers) {
    userFollowing(following: $following) {
      message
    }
  }
`;

export default function CardUser({ data }) {
  const [active, setActive] = useState(false);
  // console.log(userId);
  const [following, follow] = useMutation(FOLLOWING);
  const submitFollow = async (id) => {
    try {
      console.log(follow.data, follow.loading, follow.error);
      await following({
        variables: {
          following: {
            followingUserId: id,
          },
        },
      });
      setActive(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "white",
        padding: "5%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "gray",
      }}
    >
      {/* image */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 70, height: 70, borderRadius: 100 }}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
        {/* name */}
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{data.name}</Text>
          <Text style={{ fontSize: 20 }}>@{data.username}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={active === true ? styles.actives : styles.unActives}
        onPress={() => {
          // console.log("click");
          // console.log(data._id);
          submitFollow(data._id);
        }}
      >
        <Text style={active === true ? styles.textActive : ""}>Follow</Text>
      </TouchableOpacity>
      <Entypo name="dots-three-vertical" size={24} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  actives: {
    width: 120,
    height: 40,
    backgroundColor: "#00cbfe",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "white",
  },
  textActive: {
    color: "white",
  },
  unActives: {
    width: 120,
    height: 40,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "gray",
  },
});
