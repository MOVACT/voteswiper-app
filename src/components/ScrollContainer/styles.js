import { StyleSheet, Dimensions } from 'react-native';
import { headerHeight } from 'common';

const iPhone6 = 375;
const { width } = Dimensions.get('window');

let widthPaddingPadding = 30;

if (width < iPhone6) {
  widthPaddingPadding = 20;
}

export default StyleSheet.create({
  withPadding: {
    paddingHorizontal: widthPaddingPadding,
    paddingTop: headerHeight() + 10,
    paddingBottom: widthPaddingPadding,
  },
  flex: {
    flex: 1,
  },
});