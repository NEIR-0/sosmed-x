import {
  Image,
  ScrollView,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// query apollo server
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Query from "../query/listPost";

const LIST_POST = Query;
const LIKE_POST = gql`
  mutation CreateLike($like: PostId) {
    createLike(like: $like) {
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
        authorId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export default function Posts(props) {
  const { handlerDetailPost } = props.route.params;
  const { loading, error, data } = useQuery(LIST_POST);
  const [Liking, liked] = useMutation(LIKE_POST, {
    refetchQueries: [LIST_POST],
  });
  console.log(liked.loading, liked.data, liked.error);

  // submit
  const likingPost = async (_id) => {
    console.log(_id);
    try {
      await Liking({
        variables: {
          like: {
            postId: _id,
          },
        },
      });
      console.log("suka");
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(loading, error, data);
  const [post, setPost] = useState([]);

  useEffect(() => {
    if (data) {
      // console.log(data.listPost);
      const newPost = data.listPost.map((el) => {
        // console.log(el.comments.length, "com>>>>>>>>>>>>>>>>>>>>>>>>>");
        // console.log(el.likes.length, "Like>>>>>>>>>>>>>>>>>>>>>>>>>");

        let obj = {
          _id: el._id,
          content: el.content,
          tags: el.tags,
          imgUrl: el.imgUrl,
          authorId: el.authorId,
          comments:
            el.comments.length === 0
              ? []
              : el.comments.map((comment) => {
                  return {
                    content: comment.content,
                    username: comment.username,
                    authorId: comment.authorId,
                    createdAt: comment.createdAt,
                    updatedAt: comment.updatedAt,
                  };
                }),
          likes:
            el.likes.length === 0
              ? []
              : el.likes.map((like) => {
                  return {
                    username: like.username,
                    authorId: like.authorId,
                    createdAt: like.createdAt,
                    updatedAt: like.updatedAt,
                  };
                }),
          username: el.username,
          createdAt: el.createdAt,
          updatedAt: el.updatedAt,
        };
        return obj;
      });

      // console.log(newPost);
      setPost(newPost);
    }
  }, [data]);
  const DATA = [
    {
      _id: "65685b3de2c0edf579c7c811",
      content: "makan vanh!",
      tags: ["makan", "minum"],
      imgUrl:
        "https://images.pexels.com/photos/19193788/pexels-photo-19193788/free-photo-of-seni-atap-biru-arsitektur.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      authorId: "65685b3de2c0edf579c7c810",
      comments: [
        {
          content: "bagus banged",
          username: null,
          authorId: "65685ae7e2c0edf579c7c80f",
          createdAt: "1701338194528",
          updatedAt: "1701338194528",
        },
      ],
      likes: [
        {
          username: "bambang",
          authorId: "65685ae7e2c0edf579c7c80f",
          createdAt: "1701338194528",
          updatedAt: "1701338194528",
        },
      ],
      username: "bambang",
      createdAt: "1701337917309",
      updatedAt: "1701337917309",
    },
  ];

  const Item = ({
    _id,
    content,
    tags,
    imgUrl,
    comments,
    // isi comment
    ContentComment,
    usernameComment,
    // ================= NOT
    authorId,
    likes,
    // isi like
    usernameLiked,
    // ================= NOT
    username,
    createdAt,
    updatedAt,
  }) => (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
      }}
      onPress={() => {
        // console.log("click");
        handlerDetailPost(_id);
      }}
    >
      {/* icon user */}
      <Image
        style={{ width: 50, height: 50, marginRight: 20, borderRadius: 100 }}
        source={{
          uri: "https://source.unsplash.com/random/300x600?sig=user",
        }}
      />

      <View
        style={{
          // backgroundColor: "blue",
          flex: 1,
        }}
      >
        {/* title */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {username}
            </Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginLeft: 5,
              }}
            >
              <Entypo name="dot-single" size={20} color="black" />
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: -5,
                }}
              >
                1d
              </Text>
            </View>
          </View>
          {/* icon */}
          <View>
            <Feather name="more-vertical" size={20} color="black" />
          </View>
        </View>
        {/* des */}
        <Text style={{ fontSize: 20, marginBottom: 10 }}>{content}</Text>
        <Image
          style={{
            width: "100%",
            height: 300,
            borderRadius: 20,
            marginBottom: 5,
          }}
          source={{
            uri: imgUrl,
          }}
        />

        {/* component */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="ios-chatbubble-outline" size={24} color="black" />
            <Text>{comments.length}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="repeat" size={24} color="black" />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* like */}
            <TouchableOpacity
              onPress={() => {
                console.log("click");
                likingPost(_id);
              }}
            >
              <Entypo name="heart-outlined" size={24} color="black" />
            </TouchableOpacity>
            <Text>{likes.length}</Text>
          </View>
          <Entypo name="share" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      // data={DATA}
      data={post}
      renderItem={({ item }) => (
        <Item
          _id={item._id}
          content={item.content}
          tags={item.tags}
          imgUrl={item.imgUrl}
          comments={item.comments}
          // isi comment
          ContentComment={item.comments.content}
          usernameComment={item.comments.username}
          // =================
          authorId={item.authorId}
          likes={item.likes}
          // isi like
          usernameLiked={item.likes.username}
          // ====================
          username={item.username}
          createdAt={item.createdAt}
          updatedAt={item.updatedAt}
        />
      )}
      keyExtractor={(item) => item._id}
    />
  );
}
