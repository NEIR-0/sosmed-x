import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
// icon
import { FontAwesome } from "@expo/vector-icons";

// screen
import HomePage from "./homePage";
import SearchUser from "./searchUser";
import Message from "./message";
import Notifications from "./notifications";
import Community from "./community";

// tabs
const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "HomePage") {
              iconName = focused ? "home" : "home";
            }
            // search
            else if (route.name === "SearchUser") {
              iconName = focused ? "search" : "search";
            }
            // search
            else if (route.name === "SearchUser") {
              iconName = focused ? "home" : "home";
            }
            // Community
            else if (route.name === "Community") {
              iconName = focused ? "user" : "user";
            }
            // Notifications
            else if (route.name === "Notifications") {
              iconName = focused ? "bell" : "bell";
            }
            // Message
            else if (route.name === "Message") {
              iconName = focused ? "comment" : "comment";
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
        })}
      >
        {/* screens */}
        {/* home */}
        <Tab.Screen
          name="HomePage"
          component={HomePage}
          options={{ tabBarShowLabel: false, headerShown: false }}
        />
        {/* search */}
        <Tab.Screen
          name="SearchUser"
          component={SearchUser}
          options={{ tabBarShowLabel: false, headerShown: false }}
        />
        {/* community */}
        <Tab.Screen
          name="Community"
          component={Community}
          options={{ tabBarShowLabel: false, headerShown: false }}
        />
        {/* notification */}
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{ tabBarShowLabel: false, headerShown: false }}
        />
        {/* message */}
        <Tab.Screen
          name="Message"
          component={Message}
          options={{ tabBarShowLabel: false, headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
