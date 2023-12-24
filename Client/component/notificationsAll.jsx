import { Image, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const dataList = [
  {
    icon: <MaterialIcons name="live-tv" size={24} color="black" />,
    img: "https://source.unsplash.com/random/300x600?sig=women",
    name: "yudhit",
    des: "invite you to join live",
  },
  {
    icon: <Ionicons name="person" size={24} color="black" />,
    img: "https://source.unsplash.com/random/300x600?sig=man",
    name: "solopo",
    des: "add you as friends",
  },
  {
    icon: <MaterialIcons name="live-tv" size={24} color="black" />,
    img: "https://source.unsplash.com/random/300x600?sig=robot",
    name: "jianchi",
    des: "invite you to join live",
  },
  {
    icon: <FontAwesome name="star" size={24} color="black" />,
    img: "https://source.unsplash.com/random/300x600?sig=bike",
    name: "jokopi",
    des: "following you now",
  },
];
export default function NotificationsAll() {
  return (
    <ScrollView
      style={{
        // backgroundColor: "red",
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {/* notif */}
      {dataList &&
        dataList.map((el) => {
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "4%",
                borderBottomWidth: 0.2,
                backgroundColor: "white",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                {el.icon}
                <View style={{ marginLeft: "10%" }}>
                  <Image
                    style={{ width: 40, height: 40, borderRadius: 100 }}
                    source={{
                      uri: el.img,
                    }}
                  />
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {el.name}
                  </Text>
                  <Text style={{ fontSize: 15 }}>{el.des}</Text>
                </View>
              </View>

              <Feather name="more-vertical" size={25} color="black" />
            </View>
          );
        })}
    </ScrollView>
  );
}
