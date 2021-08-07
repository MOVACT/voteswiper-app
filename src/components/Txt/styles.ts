import {I18nManager, Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  text: {
    backgroundColor: 'transparent',
    fontFamily: Platform.isTV ? 'System' : 'Rubik-Regular',
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  },
  textMedium: {
    fontFamily: Platform.isTV ? 'System' : 'Rubik-Medium',
    fontWeight: '500',
  },
  textBold: {
    fontFamily: Platform.isTV ? 'System' : 'Rubik-Bold',
    fontWeight: 'bold',
  },
  copy: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  center: {
    textAlign: 'center',
  },
});
