import { LoginProvider } from "./context/isLogin";
import MainViews from "./screen/mainViews";

// apollo clienr
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        <MainViews />
      </LoginProvider>
    </ApolloProvider>
  );
}
