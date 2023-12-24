// File: AppNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./login";
import Register from "./register";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function MainAuth() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ tabBarShowLabel: false, headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ tabBarShowLabel: false, headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
