import React from 'react';
import {View, StatusBar, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import Txt from '../Txt';
import {isIphoneX} from 'util/iPhoneXHelper';
import styles from './styles';
import SvgClose from '../../icons/Close';

interface Props {
  onClose: () => void;
  source: {uri?: string; headers?: {[key: string]: string}} | number;
}

const FullScreenVideo: React.FC<Props> = ({onClose, source}) => {
  const interval = React.useRef<NodeJS.Timeout>();
  const player = React.useRef<Video>();
  const currentTimeRef = React.useRef(0);

  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);

  React.useEffect(() => {
    if (!isIphoneX()) {
      StatusBar.setHidden(true, 'slide');
    }

    () => {
      StatusBar.setHidden(false, 'slide');

      clearInterval(interval.current);
    };
  }, []);

  const updateCurrentTime = React.useCallback(() => {
    setCurrentTime(currentTimeRef.current);
  }, [currentTimeRef]);

  const renderCloseButton = React.useMemo(() => {
    return (
      <TouchableOpacity
        onPress={() => {
          onClose();
        }}>
        <LinearGradient
          start={{x: 1, y: 1}}
          end={{x: 0, y: 0}}
          colors={['#464872', '#5D5D94']}
          style={[styles.control]}>
          <SvgClose width="10" height="10" />
        </LinearGradient>
      </TouchableOpacity>
    );
  }, [onClose]);

  return (
    <View style={styles.videoPlayer}>
      <View style={styles.videoPlayerInner}>
        <Video
          source={source} // Can be a URL or a local file.
          ref={player}
          allowsExternalPlayback={false}
          resizeMode={'contain'}
          muted={false}
          style={styles.video}
          playWhenInactive={true}
          ignoreSilentSwitch={'ignore'}
          onLoad={(info) => {
            setDuration(info.duration);

            interval.current = setInterval(updateCurrentTime, 1000);
          }}
          onProgress={(info) => {
            currentTimeRef.current = info.currentTime;
          }}
          onEnd={() => {
            onClose();
          }}
        />
        <View style={styles.videoToolBar}>
          <View style={styles.timeRemainingBg}>
            <Txt medium style={styles.timeRemaining}>
              {duration - currentTime < 1
                ? 0
                : Math.trunc(duration - currentTime)}
            </Txt>
          </View>

          {renderCloseButton}
        </View>
      </View>
    </View>
  );
};

export default FullScreenVideo;
