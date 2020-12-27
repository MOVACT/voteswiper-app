import {StyleSheet} from 'react-native';
import {ifIphoneX} from 'util/iPhoneXHelper';

export default StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  question: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    color: '#fff',
  },
  doubleWeightToggle: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  doubleWeightText: {
    color: '#fff',
  },
  checkbox: {
    borderRadius: 3,
    borderWidth: 2,
    width: 20,
    borderColor: '#fff',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  answer: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 15,
  },
  optionLeft: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  optionRight: {
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  option: {
    position: 'relative',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderColor: '#fff',
    flex: 1,
  },
  optionActive: {
    backgroundColor: '#fff',
  },
  white: {
    color: '#fff',
  },
  activeText: {
    color: '#3A3155',
  },
  progress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  progressBg: {
    paddingHorizontal: 25,
    ...ifIphoneX({paddingBottom: 30}, {paddingBottom: 20}),
  },
});
