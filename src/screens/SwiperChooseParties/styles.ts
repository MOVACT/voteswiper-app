import {sm} from 'common/breakpoints';
import {Dimensions, StyleSheet} from 'react-native';
import {ifIphoneX} from 'util/iPhoneXHelper';

const {width} = Dimensions.get('window');

const partyBorderRadius = 10;
let partyBgPadding = 10;
let partyLogoHeight = 50;

if (width < sm) {
  partyBgPadding = 5;
  partyLogoHeight = 60;
}

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 1,
    overflow: 'hidden',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  scrollView: {
    padding: 25,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: -5,
  },
  action: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  actionDisabled: {
    opacity: 0.5,
  },
  actionText: {
    alignSelf: 'center',
    color: '#fff',
  },
  partyLogo: {
    resizeMode: 'contain',
    height: partyLogoHeight,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginHorizontal: -5,
    marginTop: 15,
    paddingBottom: 90,
  },
  party: {
    width: '50%',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  partyShadow: {
    backgroundColor: '#D9DAEB',
    borderRadius: partyBorderRadius,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 1,
  },
  partyBg: {
    padding: partyBgPadding,
    borderRadius: partyBorderRadius,
    borderWidth: 4,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  partySelected: {
    borderColor: '#E6E90F',
  },
  partyName: {
    alignSelf: 'center',
    fontSize: 12,
    paddingTop: 10,
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
