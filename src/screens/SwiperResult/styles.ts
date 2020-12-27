import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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
  screenshotArea: {
    position: 'absolute',
    left: -1000,
    top: 150,
    width: 500,
    padding: 40,
    paddingTop: 20,
    backgroundColor: '#392F52',
  },
  shareLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareLoaderIcon: {
    marginTop: -7,
  },
});
