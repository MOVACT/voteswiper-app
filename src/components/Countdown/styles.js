import { StyleSheet } from 'react-native';

const borderRadius = 10;

export default StyleSheet.create({
  countdown: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
  },
  column: {
    paddingHorizontal: 5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  number: {
    color: '#fff',
    fontSize: 24,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
    letterSpacing: 2,
  }
});