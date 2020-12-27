import {StyleSheet, Dimensions} from 'react-native';
import {sm} from 'common/breakpoints';

const {width} = Dimensions.get('window');

let buttonSize = 60;
let buttonFontSize = 16;

if (width < sm) {
  buttonSize = 50;
  buttonFontSize = 12;
}

export {buttonSize};

export default StyleSheet.create({
  button: {
    borderRadius: buttonSize / 2,
    width: buttonSize,
    height: buttonSize,
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 20},
    shadowOpacity: 0.4,
    shadowRadius: 40,
    elevation: 2,
  },
  bg: {
    flex: 1,
    borderRadius: buttonSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: buttonFontSize,
    color: '#fff',
    textAlign: 'center',
  },
});
