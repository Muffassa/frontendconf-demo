import ApolloClient from "apollo-boost";
import React from "react";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

export default App => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
