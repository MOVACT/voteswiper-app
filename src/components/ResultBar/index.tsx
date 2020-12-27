import React from 'react';
import {View, TouchableOpacity, GestureResponderEvent} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import Txt from '../Txt';
import styles from './styles';
import ChevronRight from '../../icons/ChevronRight';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  name: string;
  percentage: number;
  delay?: number;
  shareBar?: boolean;
}

const ResultBar: React.FC<Props> = ({
  delay = 0,
  shareBar = false,
  name,
  percentage,
  onPress,
}) => {
  const mounted = React.useRef(false);
  const width = React.useRef(0);
  const barWidth = React.useRef(0);
  const animation = React.useRef(new Animated.Value(0));

  const [initialKick, setInitialKick] = React.useState(false);

  const roundNumber = (num: number, scale: number) => {
    if (!('' + num).includes('e')) {
      return +(Math.round(Number(num + 'e+' + scale)) + 'e-' + scale);
    } else {
      var arr = ('' + num).split('e');
      var sig = '';
      if (+arr[1] + scale > 0) {
        sig = '+';
      }
      return +(
        Math.round(Number(+arr[0] + 'e' + sig + (+arr[1] + scale))) +
        'e-' +
        scale
      );
    }
  };

  const opacity = animation.current.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 1],
  });
  const barAnimation = animation.current.interpolate({
    inputRange: [0, 0.75, 2],
    outputRange: [
      -width.current,
      -width.current,
      -width.current + barWidth.current,
    ],
  });

  const content = animation.current.interpolate({
    inputRange: [0, 1, 1.75, 2],
    outputRange: [40, 40, 10, 0],
  });

  React.useEffect(() => {
    if (initialKick === true && mounted.current === false) {
      setTimeout(() => {
        mounted.current = true;
        Animated.timing(animation.current, {
          toValue: 2,
          duration: 750,
          easing: Easing.out(Easing.quad),
        }).start();
      }, delay);
    }
  }, [initialKick, delay]);

  return (
    <Animated.View
      style={[
        {
          opacity,
        },
      ]}>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View
          style={styles.root}
          onLayout={(event) => {
            const {width: viewWidth} = event.nativeEvent.layout;

            width.current = viewWidth;
            barWidth.current = (viewWidth * percentage) / 100;

            // We need one state update before animation to get the correct width and height
            // we could also store the width in state but I want to prevent unneccessary state
            // updates in cases where "onLayout" may be fired again, as we don't need them
            // as long as the app is non rotateable
            setInitialKick(true);
          }}>
          <Animated.View
            style={[
              styles.bar,
              {
                width: shareBar === true ? barWidth.current : width.current,
                transform: [
                  {
                    translateX: shareBar === true ? 0 : barAnimation,
                  },
                ],
              },
            ]}
          />

          <Animated.View
            style={[
              styles.content,
              {
                transform: [{translateY: content}],
              },
            ]}>
            <Txt medium style={styles.text}>
              {name}
            </Txt>

            <View style={styles.meta}>
              <Txt medium style={styles.text}>
                {roundNumber(percentage, 2).toLocaleString('de-DE')}%
              </Txt>
              {shareBar !== true ? (
                <View style={styles.icon}>
                  <ChevronRight />
                </View>
              ) : null}
            </View>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ResultBar;
