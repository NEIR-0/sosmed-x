import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
} from "@apollo/client";

// headers
import * as SecureStore from "expo-secure-store";

import { setContext } from "@apollo/client/link/context";
const httpLink = createHttpLink({
  // deploy
  uri: "http://35.198.224.98/",
  // dev
  // uri: "https://df9c-139-228-111-126.ngrok-free.app/",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync("token");
  // console.log(token, ">>>>>>>>>>");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // headers => authentication
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),

  // defaultnya:
  // uri: "https://7dfb-103-154-141-148.ngrok-free.app",
  // cache: new InMemoryCache(),
});

export default client;
