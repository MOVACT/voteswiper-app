/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ElectionsIndex from 'screens/ElectionsIndex';
import ElectionDetails from 'screens/ElectionDetails';
import SettingsCountry from 'screens/SettingsCountry';
import HelpIndex from 'screens/HelpIndex';
import InfosIndex from 'screens/InfosIndex';
import Settings from 'screens/Settings';
import HelpIcon from './icons/HelpCircle';
import InfosIcon from './icons/InfoCircle';
import ElectionsIcon from './icons/Swiper';
import SettingsIcon from './icons/Cog';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Swiper from 'screens/Swiper';
import SwiperVideo from 'screens/SwiperVideo';
import SwiperExplainer from 'screens/SwiperExplainer';
import SwiperChooseParties from 'screens/SwiperChooseParties';
import SwiperResult from 'screens/SwiperResult';
import SwiperCompareParty from 'screens/SwiperCompareParty';
import SwiperEditAnswers from 'screens/SwiperEditAnswers';
import {SvgProps} from 'react-native-svg';
import {useApp} from 'contexts/app';

const iPhone6 = 375;
const {width} = Dimensions.get('window');

let titleFontSize = 14;
let backButtonMarginLeft = 30;
if (width < iPhone6) {
  titleFontSize = 12;
  backButtonMarginLeft = 20;
}

const navigatorStyles = StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    elevation: 0,
  },
  backButton: {
    width: 26,
    height: 26,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: backButtonMarginLeft,
  },
  titleStyle: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: titleFontSize,
    fontFamily: 'Rubik-Medium',
    fontWeight: '600',
    //marginLeft: Platform.OS === "android" ? 8 : -5,
    paddingLeft: 0,
    elevation: 0,
  },
  backTitle: {
    fontSize: titleFontSize,
    fontFamily: 'Rubik-Medium',
    fontWeight: '600',
    color: '#fff',
  },
  settingsIcon: {
    marginRight: 30,
  },
});

function getIcon(name: string): React.FC<SvgProps> {
  switch (name) {
    case 'Elections':
      return ElectionsIcon;
    case 'Help':
      return HelpIcon;
    case 'Infos':
      return InfosIcon;
  }

  return ElectionsIcon;
}

const ElectionsStack = createStackNavigator();

const headerScreenOptions = {
  headerStyle: navigatorStyles.header,
  headerTransparent: true,
  headerTintColor: '#ffffff',
  headerBackTitleStyle: navigatorStyles.backTitle,
  headerTitleStyle: navigatorStyles.titleStyle,
};

const ElectionsNavigator: React.FC = () => {
  const {t} = useApp();
  return (
    <ElectionsStack.Navigator
      initialRouteName="Index"
      screenOptions={({navigation}) => ({
        ...headerScreenOptions,
        //headerBackTitle: t('navigation.backTitle'),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Settings');
            }}
            style={navigatorStyles.settingsIcon}>
            <SettingsIcon />
          </TouchableOpacity>
        ),
      })}>
      <ElectionsStack.Screen name="Index" component={ElectionsIndex} />
      <ElectionsStack.Screen
        name="Settings"
        options={{title: t('settings.title')}}
        component={Settings}
      />
      <ElectionsStack.Screen
        name="SettingsCountry"
        options={{title: t('settingsCountry.title')}}
        component={SettingsCountry}
      />

      <ElectionsStack.Screen name="Details" component={ElectionDetails} />
    </ElectionsStack.Navigator>
  );
};

const HelpStack = createStackNavigator();

const HelpNavigator: React.FC = () => {
  const {t} = useApp();
  return (
    <HelpStack.Navigator
      initialRouteName="Index"
      screenOptions={{
        headerStyle: navigatorStyles.header,
        headerTransparent: true,
        headerTitleStyle: navigatorStyles.titleStyle,
      }}>
      <HelpStack.Screen
        name="Index"
        options={{title: t('helpIndex.title')}}
        component={HelpIndex}
      />
    </HelpStack.Navigator>
  );
};

const InfoStack = createStackNavigator();

const InfoNavigator = () => {
  const {t} = useApp();
  return (
    <InfoStack.Navigator
      initialRouteName="Index"
      screenOptions={{
        headerStyle: navigatorStyles.header,
        headerTransparent: true,
        headerTitleStyle: navigatorStyles.titleStyle,
      }}>
      <InfoStack.Screen
        name="Index"
        options={{title: t('infosIndex.title')}}
        component={InfosIndex}
      />
    </InfoStack.Navigator>
  );
};

const TabStack = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  const {t} = useApp();
  return (
    <TabStack.Navigator
      initialRouteName="Elections"
      tabBarOptions={{
        style: {
          backgroundColor: 'rgb(39, 31, 59)',
          borderTopWidth: 0,
        },
        activeTintColor: '#fff',
        inactiveTintColor: 'rgba(255, 255, 255, 0.5)',
        tabStyle: {
          paddingBottom: 0,
          paddingTop: 6,
        },
        labelStyle: {
          fontSize: 9,
          fontFamily: 'Rubik-Medium',
          marginTop: 0,
          paddingTop: 0,
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          const routeName = route.name;

          const Icon = getIcon(routeName);

          return (
            <View
              style={{
                width: 35,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 0,
                opacity: focused ? 1 : 0.5,
              }}>
              <Icon />
            </View>
          );
        },
      })}>
      <TabStack.Screen
        name="Help"
        component={HelpNavigator}
        options={{tabBarLabel: t('navigation.helpTitle')}}
      />
      <TabStack.Screen
        name="Elections"
        component={ElectionsNavigator}
        options={{tabBarLabel: t('navigation.electionsTitle')}}
      />
      <TabStack.Screen
        name="Infos"
        component={InfoNavigator}
        options={{tabBarLabel: t('navigation.infoTitle')}}
      />
    </TabStack.Navigator>
  );
};

const ModalStack = createStackNavigator();

const ModalNavigator: React.FC = () => {
  const {t} = useApp();
  return (
    <ModalStack.Navigator
      initialRouteName="Swiper"
      screenOptions={{
        gestureEnabled: false,
        ...headerScreenOptions,
      }}>
      <ModalStack.Screen
        name="Swiper"
        options={{title: ''}}
        component={Swiper}
      />
      <ModalStack.Screen
        name="Video"
        options={{title: ''}}
        component={SwiperVideo}
      />
      <ModalStack.Screen
        name="Explainer"
        options={{title: ''}}
        component={SwiperExplainer}
      />
      <ModalStack.Screen
        name="ChooseParties"
        options={{title: ''}}
        component={SwiperChooseParties}
      />
      <ModalStack.Screen
        name="Result"
        options={{title: ''}}
        component={SwiperResult}
      />
      <ModalStack.Screen
        name="CompareParty"
        options={{title: ''}}
        component={SwiperCompareParty}
      />
      <ModalStack.Screen
        name="EditAnswers"
        options={{title: t('swiperResult.editAnswers')}}
        component={SwiperEditAnswers}
      />
    </ModalStack.Navigator>
  );
};

const RootStack = createStackNavigator();

const Navigator: React.FC = () => {
  return (
    <RootStack.Navigator initialRouteName="Tabs" headerMode="none" mode="modal">
      <RootStack.Screen name="Tabs" component={TabNavigator} />
      <RootStack.Screen
        name="Swiper"
        options={{gestureEnabled: false}}
        component={ModalNavigator}
      />
    </RootStack.Navigator>
  );
};

export default Navigator;
