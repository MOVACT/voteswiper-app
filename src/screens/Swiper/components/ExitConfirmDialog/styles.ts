import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    zIndex: 9999999,
  },
  box: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  bg: {
    width,
    height,
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
