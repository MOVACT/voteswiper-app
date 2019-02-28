import React from 'react';
import PropTypes from 'prop-types';
import { View, Animated } from 'react-native';
import { headerHeight } from 'common';
import styles from './styles';

const height = headerHeight();

class ScrollContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    withPadding: PropTypes.bool,
  };

  static defaultProps = {
    withPadding: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  render() {
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, 1, height - 15],
      outputRange: [-500, -height, 0],
      extrapolate: 'clamp',
    });

    const headerOpacity = this.state.scrollY.interpolate({
      inputRange: [0, height - 15],
      outputRange: [0, .9],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.flex}>
        <Animated.View
          style={{
            height: height,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            opacity: headerOpacity,
            transform: [
              { translateY: headerTranslate },
            ],
          }}
        />

        <View style={styles.flex}>
          <Animated.ScrollView
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              { useNativeDriver: true },
           )}
           {...this.props}
          >
            <View style={this.props.withPadding ? styles.withPadding : {}}>
              {this.props.children}
            </View>
          </Animated.ScrollView>
        </View>
      </View>
    );
  }
}

export default ScrollContainer;
