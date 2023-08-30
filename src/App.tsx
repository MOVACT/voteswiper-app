import {NavigationContainer} from '@react-navigation/native';
import Container from 'components/Container';
import AppProvider from 'contexts/app';
import SwiperProvider from 'contexts/swiper';
import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import MatomoTracker, {MatomoProvider} from 'matomo-tracker-react-native';
import OneSignal from 'react-native-onesignal';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import Init from './Init';

enableScreens();

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

const App: React.FC = () => {
  const instance = new MatomoTracker({
    urlBase: 'https://t.voteswiper.org/', // required
    // trackerUrl: 'https://LINK.TO.DOMAIN/tracking.php', // optional, default value: `${urlBase}matomo.php`
    siteId: 1, // required, number matching your Matomo project
    // userId: 'UID76903202' // optional, default value: `undefined`.
    // disabled: false, // optional, default value: false. Disables all tracking operations if set to true.
    // log: false  // optional, default value: false. Enables some logs if set to true.
  });

  React.useEffect(() => {
    OneSignal.init('3cbf99cf-a3e1-4f71-917f-3ef70c0fe6df');
  }, []);

  return (
    <MatomoProvider instance={instance}>
      <Container noPadding>
        <SafeAreaProvider>
          <View style={styles.app}>
            <StatusBar barStyle="light-content" backgroundColor="#392F52" />
            <AppProvider>
              <SwiperProvider>
                <NavigationContainer>
                  <Init />
                </NavigationContainer>
              </SwiperProvider>
            </AppProvider>
          </View>
        </SafeAreaProvider>
      </Container>
    </MatomoProvider>
  );
};

export default App;
