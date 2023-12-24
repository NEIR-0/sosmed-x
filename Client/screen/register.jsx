import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// register query
const REGISTER = gql`
  mutation Register($newUser: NewUser) {
    register(newUser: $newUser) {
      name
      username
      email
      password
    }
  }
`;
export default function Register() {
  // navigate
  const navigation = useNavigation();
  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  // form
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
  });

  const handleRegister = async (name, value) => {
    // console.log(name, value);
    setForm({
      ...form,
      [name]: value,
    });
  };
  // console.log(form);

  // register query
  const [register, { data, loading, error }] = useMutation(REGISTER);

  // submit
  const submitRegister = async () => {
    console.log(form);
    try {
      console.log(data, loading, error);
      await register({
        variables: {
          newUser: form,
        },
      });
      navigateToLogin();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{ width: 80, height: 80, borderRadius: 100 }}
          source={{
            uri: "https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?w=740&t=st=1701436645~exp=1701437245~hmac=30e75abf4faed53f49467ce58262a9756ad7746ec90691b4703310c0f8edb081",
          }}
        />
        <Text style={{ fontSize: 30, marginTop: 40, marginBottom: 20 }}>
          Sign in to Twitter
        </Text>

        {/* name */}
        <TextInput
          style={{
            borderWidth: 1,
            width: "70%",
            height: "7%",
            borderRadius: 100,
            paddingHorizontal: 20,
            marginVertical: 10,
          }}
          placeholder="name..."
          onChangeText={(value) => {
            handleRegister("name", value);
          }}
        />
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
          onChangeText={(value) => {
            handleRegister("username", value);
          }}
        />
        {/* email */}
        <TextInput
          style={{
            borderWidth: 1,
            width: "70%",
            height: "7%",
            borderRadius: 100,
            paddingHorizontal: 20,
            marginVertical: 10,
          }}
          placeholder="email..."
          onChangeText={(value) => {
            handleRegister("email", value);
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
          onChangeText={(value) => {
            handleRegister("password", value);
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
            submitRegister();
          }}
        >
          <Text style={{ color: "white", fontSize: 25, lineHeight: 25 }}>
            Sign in
          </Text>
        </TouchableOpacity>

        {/* register */}
        <Text style={{ marginTop: 20 }}>You have account?</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            // console.log("navigate");
            navigateToLogin();
          }}
        >
          <Text style={{ textDecorationLine: "underline" }}>Log in</Text>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}
