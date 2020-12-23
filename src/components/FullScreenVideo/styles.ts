import {StyleSheet} from 'react-native';
import {ifIphoneX} from 'util/iPhoneXHelper';

export default StyleSheet.create({
  videoPlayer: {
    position: 'absolute',
    zIndex: 2000,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    ...ifIphoneX(
      {
        paddingTop: 44,
        paddingBottom: 34,
      },
      {},
    ),
  },
  videoPlayerInner: {
    flex: 1,
  },
  video: {
    flex: 1,
  },

  videoProgress: {
    position: 'absolute',
    zIndex: 2120,
    top: 0,
    left: 0,
    height: 5,
    width: '100%',
    backgroundColor: '#DB67AE',
  },
  videoToolBar: {
    position: 'absolute',
    zIndex: 2100,
    top: 0,
    left: 0,
    right: 0,
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  timeRemainingBg: {
    backgroundColor: '#fff',
    height: 26,
    width: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeRemaining: {
    color: '#000',
    fontSize: 14,
  },
  control: {
    width: 26,
    height: 26,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
