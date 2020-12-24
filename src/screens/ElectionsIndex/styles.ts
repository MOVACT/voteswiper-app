import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  countryLink: {
    marginLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryFlag: {
    paddingRight: 10,
  },
  countryLinkText: {
    fontSize: 14,
    color: '#fff',
    marginRight: 5,
  },
  electionsList: {
    paddingTop: 10,
  },
  pastElectionsContainer: {
    paddingTop: 60,
  },
  noElectionsBox: {
    paddingTop: 30,
    paddingLeft: 25,
    paddingRight: 25,
  },
  info: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    marginBottom: 15,
  },
  infoActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 15,
  },
  infoAction: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  infoMainAction: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  switchText: {
    color: '#392F52',
  },
});

export default styles;
