import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing } from 'react-native';

class FadeIn extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    delay: PropTypes.number,
  };

  static defaultProps = {
    delay: 0,
  };

  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    setTimeout(() => {
      Animated.timing(
        this.state.opacity,
        {
          toValue: 1,
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: true,
        },
      ).start();
    }, this.props.delay);
  }

  render() {
    const scale = this.state.opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0.9, 1],
    });

    return (
      <Animated.View
        style={{
          opacity: this.state.opacity,
          transform: [
            { scale },
          ],
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default FadeIn;
