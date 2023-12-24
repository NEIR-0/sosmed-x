import { Text, TouchableOpacity, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AddComment({ handleComment, setShow, submitComment }) {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 20,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* back */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginBottom: 30,
          width: 90,
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
      <Text style={{ fontSize: 40, marginBottom: 30 }}>Add Comment</Text>
      {/* Comment */}
      <TextInput
        style={{
          borderWidth: 1,
          width: "70%",
          height: "7%",
          borderRadius: 100,
          paddingHorizontal: 20,
          marginVertical: 10,
        }}
        placeholder="Comment..."
        onChangeText={(value) => {
          handleComment("content", value);
        }}
      />
      {/* submit */}
      <TouchableOpacity
        style={{
          borderWidth: 1,
          width: "70%",
          height: "10%",
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          marginTop: 10,
        }}
        onPress={async () => {
          submitComment();
        }}
      >
        <Text style={{ color: "white", fontSize: 25, lineHeight: 25 }}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
}
