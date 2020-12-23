import {StyleSheet, Dimensions} from 'react-native';

const borderRadius = 5;

const iPhone6 = 375;
const {width} = Dimensions.get('window');

let rootPadding = 20;

if (width < iPhone6) {
  rootPadding = 15;
}

export default StyleSheet.create({
  shadow: {
    borderRadius,
    backgroundColor: '#222043',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 1,
  },
  root: {
    padding: rootPadding,
    borderRadius,
  },
});
