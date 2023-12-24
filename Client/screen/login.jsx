import { useContext, useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginContext } from "../context/isLogin";

// query apollo server
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
const LOGIN = gql`
  query LoginUser($login: LoginUser) {
    loginUser(login: $login) {
      access_token
    }
  }
`;

export default function Login() {
  const { loginAction } = useContext(LoginContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (name, value) => {
    // console.log(name, value);
    setForm({
      ...form,
      [name]: value,
    });
  };
  // console.log(form);

  // query
  const { loading, error, data, refetch } = useQuery(LOGIN, {
    variables: {
      login: {
        username: form.username,
        password: form.password,
      },
    },
  });
  // console.log(loading, error, data);

  const submitLogin = async () => {
    // console.log(form);
    try {
      // query
      refetch();
      // console.log(data.loginUser, ">>>>>>>>>");
      await loginAction("token", data.loginUser.access_token);
    } catch (error) {
      console.log(error);
    }
  };

  // navigate
  const navigation = useNavigation();
  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{ width: 150, height: 150, borderRadius: 100 }}
          source={{
            uri: "https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?w=740&t=st=1701436645~exp=1701437245~hmac=30e75abf4faed53f49467ce58262a9756ad7746ec90691b4703310c0f8edb081",
          }}
        />
        <Text style={{ fontSize: 30, marginTop: 40, marginBottom: 20 }}>
          Log in to Twitter
        </Text>
        {/* username */}
        <TextInput
          style={{
            borderWidth: 1,
            width: "70%",
            height: "7%",
            borderRadius: 100,
            paddingHorizontal: 20,
            marginVertical: 10,
          }}
          placeholder="username..."
          // input
          value={form.username}
          onChangeText={(value) => {
            handleLogin("username", value);
          }}
        />
        {/* password */}
        <TextInput
          style={{
            borderWidth: 1,
            width: "70%",
            height: "7%",
            borderRadius: 100,
            paddingHorizontal: 20,
            marginVertical: 10,
          }}
          placeholder="password..."
          secureTextEntry={true}
          // input
          value={form.password}
          onChangeText={(value) => {
            handleLogin("password", value);
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
            marginTop: 30,
          }}
          // action login
          onPress={async () => {
            submitLogin();
          }}
        >
          <Text style={{ color: "white", fontSize: 25, lineHeight: 25 }}>
            Log in
          </Text>
        </TouchableOpacity>

        {/* register */}
        <Text style={{ marginTop: 20 }}>Don't have account?</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            // console.log("navigate");
            navigateToRegister();
          }}
        >
          <Text style={{ textDecorationLine: "underline" }}>Sign Up</Text>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}
