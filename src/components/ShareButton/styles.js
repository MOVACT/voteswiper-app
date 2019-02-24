import { StyleSheet, Dimensions } from 'react-native';

const iPhone6 = 375;
const { width } = Dimensions.get('window');

let buttonMarginRight = 30;

if (width < iPhone6) {
  buttonMarginRight = 20;
}

export default StyleSheet.create({
  button: {
    width: 26,
    height: 26,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    paddingBottom: 1,
  }
});