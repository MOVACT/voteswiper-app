import ApolloClient from "apollo-boost";
import { config } from "common";

const client = new ApolloClient({
  uri: config.apiUrl,
});

export default client;