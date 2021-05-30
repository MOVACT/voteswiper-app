import {NavigationContainer} from '@react-navigation/native';
import Container from 'components/Container';
import AppProvider from 'contexts/app';
import SwiperProvider from 'contexts/swiper';
import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Matomo from 'react-native-matomo';
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
  React.useEffect(() => {
    OneSignal.init('3cbf99cf-a3e1-4f71-917f-3ef70c0fe6df');
    Matomo.initTracker('https://t.voteswiper.org/piwik.php', 1);
  }, []);

  return (
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
  );
};

export default App;
