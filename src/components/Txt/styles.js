import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  text: {
    backgroundColor: 'transparent',
    fontFamily: Platform.isTVOS ? 'System' : 'Rubik-Regular',
  },
  textMedium: {
    fontFamily: Platform.isTVOS ? 'System' : 'Rubik-Medium',
    fontWeight: '500',
  },
  textBold: {
    fontFamily: Platform.isTVOS ? 'System' : 'Rubik-Bold',
    fontWeight: 'bold',
  },
  copy: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  center: {
    textAlign: 'center',
  }
});