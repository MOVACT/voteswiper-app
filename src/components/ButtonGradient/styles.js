import { StyleSheet, Dimensions } from 'react-native';

const iPhone6 = 375;
const { width } = Dimensions.get('window');

let innerPaddingHorizontal = 40;
let innerHeight = 60;
let textFontSize = 18;

if (width < iPhone6) {
  innerPaddingHorizontal = 30;
  innerHeight = 50;
  textFontSize = 16;
}

const borderRadius = 15;

export default StyleSheet.create({
  buttonOuter: {
    alignSelf: 'center',
  },
  button: {
    marginTop: 10,
  },
  inner: {
    borderRadius,
    backgroundColor: 'transparent',
    paddingHorizontal: innerPaddingHorizontal,
    height: innerHeight,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: textFontSize,
    color: '#fff',
    alignSelf: 'center',
    textAlign: 'center',
  },
  bg: {
    borderRadius,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 1,
  },
  bgActive: {
    opacity: 1,
  }
});