import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import ApolloClient from "apollo-boost";
import { config } from "common";

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'Party': return `${object.election_id}:${object.id}`;
      default: return defaultDataIdFromObject(object);
    }
  }
});

const client = new ApolloClient({
  uri: config.apiUrl,
  cache
});

export default client;