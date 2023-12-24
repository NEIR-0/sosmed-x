import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Query from "../query/listPost";
const LIST_POST = Query;
const ADD_POST = gql`
  mutation CreatePost($newPost: CreatePost) {
    createPost(newPost: $newPost) {
      message
    }
  }
`;
export default function AddPost({ setShow }) {
  const [form, setForm] = useState({
    tags: "",
    imgUrl: "",
    content: "",
  });

  const formPost = async (name, value) => {
    // console.log(name, value);
    setForm({
      ...form,
      [name]: value,
    });
  };
  //   console.log(form);

  // addpost query
  const [addPost, { data, loading, error }] = useMutation(ADD_POST, {
    refetchQueries: [LIST_POST],
  });

  const submitLogin = async () => {
    console.log(form);
    const listTags = form.tags.split(", ");
    try {
      console.log(data, loading, error);
      await addPost({
        variables: {
          newPost: {
            tags: listTags,
            imgUrl: form.imgUrl,
            content: form.content,
          },
        },
      });
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "120%",
        backgroundColor: "white",
        marginTop: "-14%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: 20,
      }}
    >
      <View
        style={{
          // backgroundColor: "red",
          width: "80%",
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: 130,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setShow(false);
          }}
        >
          <Ionicons name="arrow-back" size={35} color="black" />
          <Text style={{ fontSize: 30, marginLeft: 20 }}>back</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 40, fontWeight: "bold", marginBottom: 20 }}>
        Add New Post
      </Text>
      <View
        style={{
          //   backgroundColor: "green",
          width: "90%",
          alignItems: "center",
        }}
      >
        {/* content */}
        <TextInput
          style={{
            borderWidth: 1,
            width: "90%",
            height: 50,
            borderRadius: 100,
            paddingHorizontal: 20,
            marginVertical: 10,
          }}
          placeholder="content..."
          // input
          value={form.username}
          onChangeText={(value) => {
            formPost("content", value);
          }}
        />

        {/* imgUrl */}
        <TextInput
          style={{
            borderWidth: 1,
            width: "90%",
            height: 50,
            borderRadius: 100,
            paddingHorizontal: 20,
            marginVertical: 10,
          }}
          placeholder="imgUrl..."
          // input
          value={form.username}
          onChangeText={(value) => {
            formPost("imgUrl", value);
          }}
        />

        {/* Tags */}
        <TextInput
          style={{
            borderWidth: 1,
            width: "90%",
            height: 50,
            borderRadius: 100,
            paddingHorizontal: 20,
            marginVertical: 10,
          }}
          placeholder="vacation, food, beauty...."
          // input
          value={form.username}
          onChangeText={(value) => {
            formPost("tags", value);
          }}
        />

        <TouchableOpacity
          style={{
            borderWidth: 1,
            width: "60%",
            height: "17%",
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            marginTop: 30,
          }}
          // action login
          onPress={async () => {
            submitLogin();
          }}
        >
          <Text style={{ color: "white", fontSize: 25, lineHeight: 25 }}>
            submit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
