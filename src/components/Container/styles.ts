import {StyleSheet, Dimensions} from 'react-native';
import {headerHeight} from 'common';

const iPhone6 = 375;
const {width} = Dimensions.get('window');

let widthPaddingPadding = 30;

if (width < iPhone6) {
  widthPaddingPadding = 20;
}

export default StyleSheet.create({
  root: {
    flex: 1,
    // paddingBottom: 50,
  },
  withPadding: {
    paddingHorizontal: widthPaddingPadding,
    paddingTop: headerHeight() + 10,
  },
  noPadding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});
