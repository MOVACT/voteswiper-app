import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');

const actionListPadding = 25;

export default StyleSheet.create({
  actionList: {
    marginHorizontal: -25,
  },
  actionListContainer: {
    paddingLeft: actionListPadding,
    paddingRight: 10,
  },
  actionItem: {
    width: (width - actionListPadding * 2) / 2 - 10,
    paddingRight: 15,
  },
  actionButton: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
  },
  actionIcon: {
    marginBottom: 10,
  },
  container: {
    padding: 25,
  },
  actions: {
    flexDirection: 'row',
    marginHorizontal: -5,
  },
  action: {
    width: '50%',
    paddingHorizontal: 5,
  },
  results: {
    flex: 1,
    paddingTop: 10,
  },
  topMatchContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 5,
  },
  topMatch: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topMatchLogo: {
    width: 80,
    height: 50,
  },
  topMatchLogoImage: {
    width: 80,
    height: 50,
    resizeMode: 'contain',
  },
  topMatchContent: {
    paddingLeft: 15,
    flex: 1,
  },
  topMatchSubTitle: {
    fontSize: 10,
    marginTop: 0,
  },
  topMatchTitle: {
    fontSize: 14,
    color: '#392F52',
    marginBottom: 5,
  },
  programLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  programLinkText: {
    fontSize: 12,
    marginLeft: 5,
    color: '#000000',
  },
});
