import { Text, TouchableOpacity, View } from "react-native";

export default function BtnAddPost({ setShow }) {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        zIndex: 10,
        backgroundColor: "#00cbfe",
        bottom: 15,
        right: 15,
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
      <Text style={{ fontSize: 30, color: "white" }}>+</Text>
    </TouchableOpacity>
  );
}
