import {sm} from 'common/breakpoints';
import {Dimensions, StyleSheet} from 'react-native';
import {cardBorderRadius} from './components/Card/styles';

const {width} = Dimensions.get('window');

let containerPaddingHorizontal = 30;
const controlsPaddingTop = 40;

if (width < sm) {
  containerPaddingHorizontal = 20;
}

export {containerPaddingHorizontal, controlsPaddingTop};

export default StyleSheet.create({
  headerClose: {
    marginRight: 15,
  },
  headerCloseAction: {
    padding: 5,
  },
  headerLeft: {
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerNavigation: {
    flexDirection: 'row',
  },
  headerTitle: {
    marginLeft: 10,
  },
  headerTitleText: {
    color: '#fff',
    fontSize: 14,
  },
  root: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  swiper: {
    flex: 1,
    padding: containerPaddingHorizontal,
    position: 'relative',
    zIndex: 100,
  },
  controls: {
    paddingTop: controlsPaddingTop,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'relative',
    zIndex: 50,
    paddingHorizontal: containerPaddingHorizontal + 20,
  },
  skip: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  skipText: {
    fontSize: 12,
    color: '#fff',
    paddingTop: 5,
  },
  noOverlayWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(240, 52, 52, 0.5)',
    borderRadius: cardBorderRadius,
  },
  yesOverlayWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 230, 64, 0.5)',
    borderRadius: cardBorderRadius,
  },
  skipOverlayWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(117, 119, 189, 0.5)',
    borderRadius: cardBorderRadius,
  },
  overlayText: {
    fontSize: 30,
    color: '#ffffff',
  },
  noOverlay: {
    backgroundColor: 'rgb(240, 52, 52)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  yesOverlay: {
    backgroundColor: 'rgb(0, 230, 64)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  skipOverlay: {
    backgroundColor: 'rgb(117, 119, 189)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
