import {StyleSheet} from 'react-native';

const borderRadius = 11;

export default StyleSheet.create({
  shadow: {
    backgroundColor: '#fff',
    borderRadius,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 2,
    marginTop: 20,
  },
  card: {
    aspectRatio: 16 / 9,
  },
  cardHolder: {
    borderTopLeftRadius: borderRadius - 1,
    borderTopRightRadius: borderRadius - 1,
    overflow: 'hidden',
  },
  root: {
    borderRadius,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  disabled: {
    opacity: 0.6,
  },
  content: {
    paddingRight: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    flexWrap: 'wrap',
    color: '#59568B',
  },
  subTitle: {
    fontSize: 14,
    color: '#59568B',
    opacity: 0.75,
    paddingTop: 1,
  },
  icon: {
    textShadowColor: 'rgba(129, 134, 215, 0.2)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 5,
  },
});
