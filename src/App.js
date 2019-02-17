import React from "react";
import { Provider } from "mobx-react/native";
import { ApolloProvider } from "react-apollo";
import { View, StatusBar } from "react-native";
import stores from "stores";
import { client } from "util";
import Init from "./Init";

class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <ApolloProvider client={client}>
          <Provider {...stores}>
            <Init />
          </Provider>
        </ApolloProvider>
      </View>
    );
  }
}

export default App;