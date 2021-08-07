import {I18nManager, StyleSheet} from 'react-native';

export default StyleSheet.create({
  mirror: {
    transform: [
      {
        scaleX: I18nManager.isRTL ? -1 : 1,
      },
    ],
  },
});
