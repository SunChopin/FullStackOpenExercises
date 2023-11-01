// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// const client = new ApolloClient({
//   uri: "http://localhost:4000",
//   cache: new InMemoryCache(),
// });

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>
// );

// import ReactDOM from "react-dom/client";
// import App from "./App";

// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
// } from "@apollo/client";

// import { setContext } from "@apollo/client/link/context";

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("booklist-user-token");
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : null,
//     },
//   };
// });

// const httpLink = createHttpLink({ uri: "http://localhost:4000" });

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: authLink.concat(httpLink),
// });

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>
// );

import ReactDOM from "react-dom/client";
import App from "./App";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";

import { setContext } from "apollo-link-context";

import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("booklist-user-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({ uri: "http://localhost:4000" });

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000",
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
