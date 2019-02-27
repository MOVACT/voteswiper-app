import { StyleSheet, Platform } from 'react-native';

const borderRadius = 10;

export default StyleSheet.create({
  button: {
    marginTop: 10,
  },
  inner: {
    borderRadius,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingTop: Platform.isTVOS ? 15 : 11,
    paddingBottom: Platform.isTVOS ? 19 : 13,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: Platform.isTVOS ? 29 : 14,
    color: '#fff',
  },
  bg: {
    borderRadius,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4,
  },
  bgActive: {
    opacity: 0.8,
  },
  icon: {
    marginRight: 10,
  },
  textWithIcon: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center', 
  },
});