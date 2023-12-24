import { ScrollView, Text, View } from "react-native";

export default function Verified() {
  return (
    <View
      style={{
        // backgroundColor: "red",
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        padding: "5%",
      }}
    >
      <View>
        <Text style={{ fontSize: 40, fontWeight: "bold" }}>
          nothing new here...
        </Text>
        <Text style={{ fontSize: 20 }}>find some friends maybe u need it!</Text>
      </View>
    </View>
  );
}
