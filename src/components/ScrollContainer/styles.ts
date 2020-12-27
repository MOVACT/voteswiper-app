import {StyleSheet, Dimensions} from 'react-native';

const iPhone6 = 375;
const {width} = Dimensions.get('window');

let widthPaddingPadding = 30;

if (width < iPhone6) {
  widthPaddingPadding = 20;
}

export default StyleSheet.create({
  withPadding: {
    paddingHorizontal: widthPaddingPadding,
    paddingBottom: widthPaddingPadding,
  },
  flex: {
    flex: 1,
  },
});
