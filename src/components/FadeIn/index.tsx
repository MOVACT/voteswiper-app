import React from 'react';
import Animated, {Easing} from 'react-native-reanimated';

interface Props {
  delay?: number;
}

const FadeIn: React.FC<Props> = ({delay = 0, children}) => {
  const animValue = React.useRef(new Animated.Value(0));

  React.useEffect(() => {
    setTimeout(() => {
      Animated.timing(animValue.current, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
      }).start();
    }, delay);
  }, [delay]);

  const scale = animValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });

  return (
    <Animated.View
      style={{
        opacity: animValue.current,
        transform: [{scale}],
      }}>
      {children}
    </Animated.View>
  );
};

export default FadeIn;
