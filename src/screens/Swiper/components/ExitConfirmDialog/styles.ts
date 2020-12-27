import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 9999999,
  },
  box: {
    width: '100%',
  },
  bg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  text: {
    color: '#392F52',
  },
  title: {
    color: '#392F52',
  },
  actions: {
    flexDirection: 'row',
    marginHorizontal: -5,
    paddingTop: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 40,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
  },
});
