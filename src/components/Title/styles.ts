import {StyleSheet, Dimensions} from 'react-native';

const iPhone6 = 375;
const {width} = Dimensions.get('window');

let h5FontSize = 12;
let mainBigFontSize = 18;
let mainBigLineHeight = 24;

if (width < iPhone6) {
  h5FontSize = 10;
  mainBigFontSize = 16;
  mainBigLineHeight = 22;
}

export default StyleSheet.create({
  center: {
    alignSelf: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },

  /* Title Styles */
  h1: {
    color: '#fff',
    fontSize: 18,
    marginTop: 25,
    marginBottom: 5,
  },
  h5: {
    fontSize: h5FontSize,
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 2,
    marginTop: 10,
    marginBottom: 5,
  },
  h5dark: {
    color: '#392F52',
    opacity: 0.7,
  },

  mainBig: {
    fontSize: mainBigFontSize,
    lineHeight: mainBigLineHeight,
    paddingBottom: 10,
    color: '#fff',
    fontWeight: '600',
  },
});
