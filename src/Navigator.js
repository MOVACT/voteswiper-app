import React from "react";
import { StyleSheet, View, Dimensions, Platform, TouchableOpacity } from "react-native";
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from "react-navigation";
import { ElectionsIndex, SettingsCountry } from "screens";
import { t } from "util";
import HelpIcon from "./icons/HelpCircle";
import InfosIcon from "./icons/InfoCircle";
import ElectionsIcon from "./icons/Swiper";
import SettingsIcon from "./icons/Cog";

const iPhone6 = 375;
const { width } = Dimensions.get('window');

let titleFontSize = 14;
let backButtonMarginLeft = 30;
if (width < iPhone6) {
  titleFontSize = 12;
  backButtonMarginLeft = 20;
}

const navigatorStyles = StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    elevation: 0
  },
  backButton: {
    width: 26,
    height: 26,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: backButtonMarginLeft
  },
  titleStyle: {
    color: "#fff",
    alignSelf: "center",
    fontSize: titleFontSize,
    fontFamily: "Rubik-Medium",
    fontWeight: "600",
    //marginLeft: Platform.OS === "android" ? 8 : -5,
    paddingLeft: 0,
    elevation: 0,
  },
  backTitle: {
    fontSize: titleFontSize,
    fontFamily: "Rubik-Medium",
    fontWeight: "600",
    color: "#fff",
  },
  titleContainerStyle: {
    alignContent: "center",
    justifyContent: 'center',
    paddingLeft: 0,
    marginLeft: 0,
  }
});

function getIcon(name) {
  switch(name) {
    case "Elections":
      return ElectionsIcon;
    case "Help":
      return HelpIcon;
    case "Infos":
      return InfosIcon;
  }
}

const ElectionsStack = createStackNavigator(
  {
    Index: { screen: ElectionsIndex },
    SettingsCountry: { screen: SettingsCountry },
  },
  {
    initialRouteName: "Index",
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: navigatorStyles.header,
      headerTitleContainerStyle: navigatorStyles.titleContainerStyle,
      headerTransparent: true,
      headerTintColor: "#ffffff",
      headerBackTitleStyle: navigatorStyles.backTitle,
      headerBackTitle: t('navigation.backTitle'),
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            console.log(navigation);
          }}
          style={{ marginRight: 30 }}
        >
          <SettingsIcon />
        </TouchableOpacity>
      ),
      headerTitleStyle: navigatorStyles.titleStyle
    })
  }
);

const TabStack = createBottomTabNavigator(
  {
    Help: {
      screen: ElectionsStack,
      navigationOptions: { tabBarLabel: t('navigation.helpTitle') }
    },
    Elections: {
      screen: ElectionsStack,
      navigationOptions: { tabBarLabel: t('navigation.electionsTitle') }
    },
    Infos: {
      screen: ElectionsStack,
      navigationOptions: { tabBarLabel: t('navigation.infoTitle') }
    },
  },
  {
    initialRouteName: "Elections",
    animationEnabled: false,
    swipeEnabled: false,
    defaultNavigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;

        const Icon = getIcon(routeName);

        return (
          <View
            style={{
              width: 35,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
              opacity: focused ? 1 : 0.5,
            }}
          >
            <Icon />
          </View>
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "#fff",
      inactiveTintColor: "rgba(255, 255, 255, 0.5)",
      upperCaseLabel: true,
      style: {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        height: 50,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
      },
      tabStyle: {
        paddingBottom: 0,
        paddingTop: 12
      },
      labelStyle: {
        fontSize: 9,
        fontFamily: "Rubik-Medium",
        marginTop: 0,
        paddingTop: 0
      }
    },
  }
);

export default createAppContainer(createStackNavigator(
  {
    Tabs: { screen: TabStack },
  },
  {
    mode: "modal",
    headerMode: "none",
    initialRouteName: "Tabs"
  }
));