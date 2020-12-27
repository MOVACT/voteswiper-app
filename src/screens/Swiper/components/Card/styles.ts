import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('window');

const cardBorderRadius = 15;
let thumbnailHeight = 150;

if (height > 800) {
  thumbnailHeight = 250;
}

export {cardBorderRadius};

export default StyleSheet.create({
  card: {
    flex: 1,
    position: 'relative',
    borderRadius: cardBorderRadius,
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 20},
    shadowOpacity: 0.4,
    //elevation: 5,
    shadowRadius: 40,
  },
  inner: {
    flex: 1,
    borderRadius: cardBorderRadius,
    padding: 25,
  },
  border: {
    borderColor: '#E6E90F',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    borderWidth: 4,
    borderRadius: cardBorderRadius,
  },
  thumbnail: {
    position: 'relative',
    maxHeight: thumbnailHeight,
    flex: 1,
  },
  thumbnailImage: {
    flex: 1,
    borderRadius: 5,
  },
  videoLink: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    paddingLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIcon: {
    transform: [{translateX: -2}],
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    color: '#392F52',
  },
  doubleWeightContainer: {
    height: 32,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  doubleWeightContainerIOS: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  doubleWeightLabel: {
    height: 30,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  doubleWeightedLabel: {
    backgroundColor: '#E6E90F',
  },
  doubleWeightText: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 12,
  },
});
