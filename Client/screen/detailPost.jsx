import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Fontisto } from "@expo/vector-icons";
import AddComment from "../component/formComment";
import Query from "../query/listPost";
const LIST_POST = Query;

const DETAIL_POST = gql`
  query PostById($post: PostId) {
    postById(post: $post) {
      _id
      content
      tags
      imgUrl
      authorId
      username
      comments {
        content
        username
        authorId
        createdAt
        updatedAt
      }
      likes {
        username
        authorId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

const ADD_COMMENT = gql`
  mutation CreateComment($newComment: CreateComment) {
    createComment(newComment: $newComment) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        authorId
        createdAt
        updatedAt
      }
      likes {
        authorId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export default function DetailPost({ setDetail, idPost }) {
  const [show, setShow] = useState(false);
  const [post, setPost] = useState([]);
  const [form, setForm] = useState({
    postId: idPost,
    content: "",
  });

  const { loading, error, data } = useQuery(DETAIL_POST, {
    variables: {
      post: {
        postId: idPost,
      },
    },
  });
  // console.log(loading, error, data);

  const handleComment = async (name, value) => {
    // console.log(name, value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  const [addComment, comment] = useMutation(ADD_COMMENT, {
    refetchQueries: [LIST_POST],
  });

  // submit
  const submitComment = async () => {
    console.log(form);
    try {
      console.log(comment.loading, comment.data, comment.error);
      await addComment({
        variables: {
          newComment: form,
        },
      });
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      console.log(data.postById);
      console.log(data.postById.comments.length, "comment >>>>>>>>>>>>>>");
      console.log(data.postById.likes.length, "comment >>>>>>>>>>>>>>");

      const detailPost = {
        _id: data.postById._id,
        content: data.postById.content,
        tags: data.postById.tags,
        imgUrl: data.postById.imgUrl,
        authorId: data.postById.authorId,
        username: data.postById.username,
        comments:
          data.postById.comments.length === 0
            ? []
            : data.postById.comments.map((comment) => {
                return {
                  content: comment.content,
                  username: comment.username,
                  authorId: comment.authorId,
                  createdAt: comment.createdAt,
                  updatedAt: comment.updatedAt,
                };
              }),
        likes:
          data.postById.likes.length === 0
            ? []
            : data.postById.likes.map((like) => {
                return {
                  username: like.username,
                  authorId: like.authorId,
                  createdAt: like.createdAt,
                  updatedAt: like.updatedAt,
                };
              }),
        createdAt: data.postById.createdAt,
        updatedAt: data.postById.updatedAt,
      };

      setPost(detailPost);
    }
  }, [data]);

  const DATA = [
    // {
    //   id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    //   title: "First Item",
    // },
    post,
  ];
  // console.log(DATA);
  const Item = ({
    _id,
    content,
    tags,
    imgUrl,
    comments,
    // comment
    ContentComment,
    usernameComment,
    authorId,
    // liked
    likes,
    username,
    createdAt,
    updatedAt,
    // title,
  }) => (
    // <Text>{_id}</Text>
    <ScrollView
      style={{
        backgroundColor: "white",
        paddingHorizontal: "5%",
      }}
    >
      {/* user */}
      <View
        style={{
          width: "100%",
          // backgroundColor: "red",
          marginVertical: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 100 }}
            source={{
              uri: "https://source.unsplash.com/random/300x600?sig=user",
            }}
          />
          {/* name */}
          <View style={{ marginLeft: "5%" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{username}</Text>
            <Text style={{ fontSize: 20 }}>@{username}</Text>
          </View>
        </View>

        {/* more */}
        <Entypo name="dots-three-vertical" size={24} color="black" />
      </View>

      {/* post */}
      <View
        style={
          {
            // backgroundColor: "red"
          }
        }
      >
        {/* des */}
        <Text style={{ fontSize: 20, textAlign: "justify" }}>{content}</Text>
        <Image
          style={{
            width: "100%",
            height: 350,
            borderRadius: 10,
            marginVertical: "5%",
          }}
          source={{
            uri: imgUrl,
          }}
        />
        {/* likes */}
        <Text style={{ fontSize: 20 }}>{likes && likes.length} Likes</Text>
        {/* comment */}

        {comments &&
          comments.map((comment) => (
            <View
              style={{
                width: "100%",
                // backgroundColor: "blue",
                paddingVertical: "5%",
                borderBottomWidth: 0.2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* user */}
                <View style={{ flexDirection: "row" }}>
                  {/* user profile */}
                  <Image
                    style={{ width: 50, height: 50, borderRadius: 100 }}
                    source={{
                      uri: "https://reactnative.dev/img/tiny_logo.png",
                    }}
                  />
                  {/* name */}
                  <View style={{ marginLeft: "5%" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {comment.username}
                    </Text>
                    <Text style={{ fontSize: 20 }}>Repleying</Text>
                  </View>
                </View>
                {/* more */}
                <Entypo name="dots-three-vertical" size={24} color="black" />
              </View>
              {/* comment */}
              <View style={{ marginLeft: "17%" }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {comment.content}
                </Text>
              </View>
            </View>
          ))}
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        marginTop: "-14%",
        position: "relative",
      }}
    >
      {/* form */}
      {show === true ? (
        <AddComment
          setShow={setShow}
          handleComment={handleComment}
          submitComment={submitComment}
        />
      ) : (
        ""
      )}

      {/* add comment */}
      <TouchableOpacity
        style={{
          position: "absolute",
          right: "20%",
          bottom: 20,
          zIndex: 10,
          backgroundColor: "#00cbfe",
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 100,
        }}
        onPress={() => {
          console.log("click");
          setShow(true);
        }}
      >
        <Fontisto name="commenting" size={20} color="white" />
      </TouchableOpacity>
      {/* navbar */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
          paddingHorizontal: "5%",
          justifyContent: "flex-start",
          alignItems: "center",
          height: 70,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setDetail(false);
          }}
        >
          <Ionicons
            name="arrow-back"
            color="black"
            style={{ fontSize: 35, marginRight: "10%" }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 35 }}>Post</Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            _id={item._id}
            content={item.content}
            tags={item.tags}
            imgUrl={item.imgUrl}
            comments={item.comments}
            authorId={item.authorId}
            likes={item.likes}
            // // ====================
            username={item.username}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
            // title={item.title}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
