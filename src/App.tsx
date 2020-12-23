import React from 'react';
import {Provider} from 'mobx-react/native';
import {ApolloProvider} from 'react-apollo';
import {View, StatusBar, StyleSheet} from 'react-native';
import OneSignal from 'react-native-onesignal';
import Matomo from 'react-native-matomo';
import stores from 'stores';
import client from 'util/client';
import Init from './Init';
import AppProvider from 'contexts/app';

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

const App: React.FC = () => {
  React.useEffect(() => {
    OneSignal.init('3cbf99cf-a3e1-4f71-917f-3ef70c0fe6df');
    Matomo.initTracker('https://t.voteswiper.org/piwik.php', 1);
  }, []);

  return (
    <View style={styles.app}>
      <StatusBar barStyle="light-content" backgroundColor="#392F52" />
      <ApolloProvider client={client}>
        <AppProvider>
          <Provider {...stores}>
            <Init />
          </Provider>
        </AppProvider>
      </ApolloProvider>
    </View>
  );
};

export default App;
