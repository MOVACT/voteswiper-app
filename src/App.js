import React from "react";
import { Provider } from "mobx-react/native";
import { ApolloProvider } from "react-apollo";
import { View, StatusBar } from "react-native";
import OneSignal from "react-native-onesignal";
import Matomo from "react-native-matomo";
import stores from "stores";
import { client } from "util";
import Init from "./Init";

class App extends React.Component {
  componentWillMount() {
    OneSignal.init("3cbf99cf-a3e1-4f71-917f-3ef70c0fe6df");
  }

  constructor(props) {
    super(props);
    // console.log(Matomo);
    Matomo.initTracker('https://t.voteswiper.org/piwik.php', 1);
  }

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