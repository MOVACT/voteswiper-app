import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    height: 40,
    borderRadius: 3,
    backgroundColor: '#8186D7',
    overflow: 'hidden',
  },
  container: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 1,
    borderRadius: 3,
    backgroundColor: '#8186D7',
    marginTop: 10,
  },
  bar: {
    backgroundColor: '#DB67AE',
    height: 40,
    borderRadius: 3,
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 15,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
  icon: {
    marginLeft: 5,
  },
});
