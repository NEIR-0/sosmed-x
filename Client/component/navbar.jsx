import {
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function Navbar({ text, searchUser, submitName, setProfiles }) {
  return (
    <View
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "10%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: "5%",
        borderBottomWidth: 0.2,
        borderBottomColor: "black",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableWithoutFeedback
          onPress={async () => {
            console.log("click");
            setProfiles(true);
            // LogoutActions("token");
          }}
        >
          <Image
            style={{
              width: 35,
              height: 35,
              borderRadius: 100,
              marginRight: "5%",
            }}
            source={{
              uri: "https://source.unsplash.com/random/300x600?sig=people",
            }}
          />
        </TouchableWithoutFeedback>
        {/* title */}
        {text === "Search" ||
        text === "Search Direct Message" ||
        text === "logo" ? (
          ""
        ) : (
          <Text style={{ fontSize: 25 }}>{text}</Text>
        )}
      </View>

      {/* search bar */}
      {text === "Search" || text === "Search Direct Message" ? (
        <TextInput
          style={{
            //   backgroundColor: "red",
            width: 280,
            paddingVertical: 2,
            paddingHorizontal: 15,
            borderRadius: 100,
            borderWidth: 1,
          }}
          placeholder={text + "...."}
          onChangeText={(value) => {
            searchUser("searching", value);
          }}
          onSubmitEditing={submitName}
        ></TextInput>
      ) : (
        ""
      )}

      {/* logo */}
      {text === "logo" && (
        <Image
          style={{
            width: 50,
            height: 50,
            marginRight: "5%",
          }}
          source={{
            uri: "https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?w=740&t=st=1701593191~exp=1701593791~hmac=14f4e1096000ff00d0a11cd892721cfd8667f935a67e25ca4d4de5ceb8d55c10",
          }}
        />
      )}
      {/* icon */}
      {text === "Communities" ? (
        <View
          style={{
            flexDirection: "row",
            //   backgroundColor: "blue",
            width: "20%",
            justifyContent: "space-between",
          }}
        >
          <Ionicons name="search" size={30} color="black" />
          <Ionicons name="people-sharp" size={30} color="black" />
        </View>
      ) : (
        <View
          style={{
            // backgroundColor: "blue",
            marginLeft: "5%",
          }}
        >
          <AntDesign name="setting" size={30} color="black" />
        </View>
      )}
    </View>
  );
}
