import {sm} from 'common/breakpoints';
import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

let questionsPadding = 30;

if (width < sm) {
  questionsPadding = 20;
}

export default StyleSheet.create({
  container: {
    padding: 25,
  },
  party: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  partyLogoContainer: {
    marginTop: questionsPadding,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  partyLogo: {
    width: 200,
    height: 70,
  },
  partyButton: {
    width: '100%',
  },
  partyTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  doubleWeighted: {
    justifyContent: 'flex-start',
  },
  doubleWeightedLabel: {
    backgroundColor: '#E6E90F',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 3,
  },
  doubleWeightedText: {
    color: '#000',
    lineHeight: 16,
    textAlign: 'center',
  },
  thesis: {
    fontSize: 16,
    lineHeight: 20,
    color: '#392F52',
  },
  reasonLink: {
    marginTop: 5,
    color: '#392F52',
    fontSize: 14,
    opacity: 0.9,
  },
  reason: {
    marginHorizontal: -25,
    paddingHorizontal: 25,
    paddingVertical: 25 - 5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    marginTop: 15,
  },
  reasonText: {
    color: '#392f52',
    fontSize: 14,
    lineHeight: 20,
  },
  answers: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 10,
  },
  answer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noneLabel: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(60, 60, 60, 1)',
    borderRadius: 5,
    marginTop: 5,
  },
  yesLabel: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#12a73b',
    borderRadius: 5,
    marginTop: 5,
  },
  noLabel: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#b92727',
    borderRadius: 5,
    marginTop: 5,
  },
  labelText: {
    color: '#fff',
    fontSize: 14,
  },
});
