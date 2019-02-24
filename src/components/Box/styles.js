import { StyleSheet, Dimensions, Platform } from 'react-native';

const borderRadius = 5;

const iPhone6 = 375;
const { width } = Dimensions.get('window');

let rootPadding = 20;
let withActionPaddingHorizontal = 40;
let withActionPaddingTop = withActionPaddingHorizontal;
let withActionPaddingBottom = 60;

if (width < iPhone6) {
  rootPadding = 15;
  withActionPaddingHorizontal = 20;
  withActionPaddingTop = withActionPaddingHorizontal;
  withActionPaddingBottom = 30;
}

export default StyleSheet.create({
  shadow: {
    borderRadius,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 0,
    marginTop: 30,
    backgroundColor: "transparent"
  },
  root: {
    padding: rootPadding,
    borderRadius
  },

  withAction: {
    marginBottom: 30,
    paddingHorizontal: withActionPaddingHorizontal,
    paddingTop: withActionPaddingTop,
    paddingBottom: withActionPaddingBottom
  },
  withBorder: {
    borderWidth: Platform.OS === "android" ? 0 : 4,
    borderColor: "#E6E90F",
    overflow: "hidden"
  },
  action: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2
  }
});