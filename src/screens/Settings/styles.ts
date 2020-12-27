import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  countriesList: {
    paddingTop: 10,
  },
  language: {
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.0)',
    marginTop: 15,
    borderRadius: 10,
  },
  activeLanguage: {
    borderColor: '#E6E90F',
  },
  offset: {
    height: 90,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
