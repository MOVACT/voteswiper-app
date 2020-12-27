import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
let iPhone6 = 375;

let containerPaddingHorizontal = 30;

if (width < iPhone6) {
  containerPaddingHorizontal = 20;
}

export default StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    paddingHorizontal: containerPaddingHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'red',
  },
});
