import React from "react";
import PropTypes from "prop-types";
import { View, Animated, Easing, TouchableOpacity } from "react-native";
import Txt from "../Txt/Txt";
import styles from "./styles";
import ChevronRight from "../../icons/ChevronRight";

class ResultBar extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired,
    delay: PropTypes.number,
    shareBar: PropTypes.bool
  };

  static defaultProps = {
    delay: 0
  };

  constructor(props) {
    super(props);

    this.mounted = false;
    this.width = 0;
    this.barWidth = 0;

    this.state = {
      animation: new Animated.Value(0),
      initialKick: false
    };
  }

  roundNumber(num, scale) {
    if (!("" + num).includes("e")) {
      return +(Math.round(num + "e+" + scale) + "e-" + scale);
    } else {
      var arr = ("" + num).split("e");
      var sig = "";
      if (+arr[1] + scale > 0) {
        sig = "+";
      }
      return +(
        Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) +
        "e-" +
        scale
      );
    }
  }

  render() {
    const opacity = this.state.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 1]
    });
    const barAnimation = this.state.animation.interpolate({
      inputRange: [0, 0.75, 2],
      outputRange: [-this.width, -this.width, -this.width + this.barWidth]
    });

    const content = this.state.animation.interpolate({
      inputRange: [0, 1, 1.75, 2],
      outputRange: [40, 40, 10, 0]
    });

    return (
      <Animated.View
        style={[
          {
            opacity
          }
        ]}
      >
        <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
          <View
            style={styles.root}
            onLayout={event => {
              const { width } = event.nativeEvent.layout;

              this.width = width;
              this.barWidth = (width * this.props.percentage) / 100;

              // We need one state update before animation to get the correct width and height
              // we could also store the width in state but I want to prevent unneccessary state
              // updates in cases where "onLayout" may be fired again, as we don't need them
              // as long as the app is non rotateable
              this.setState(
                {
                  initialKick: true
                },
                () => {
                  if (this.mounted === false) {
                    setTimeout(() => {
                      this.mounted = true;
                      Animated.timing(this.state.animation, {
                        toValue: 2,
                        duration: 750,
                        useNativeDriver: true,
                        easing: Easing.out(Easing.quad)
                      }).start();
                    }, this.props.delay);
                  }
                }
              );
            }}
          >
            <Animated.View
              style={[
                styles.bar,
                {
                  width:
                    this.props.shareBar === true ? this.barWidth : this.width,
                  transform: [
                    {
                      translateX:
                        this.props.shareBar === true ? 0 : barAnimation
                    }
                  ]
                }
              ]}
            />

            <Animated.View
              style={[
                styles.content,
                {
                  transform: [{ translateY: content }]
                }
              ]}
            >
              <Txt medium style={styles.text}>
                {this.props.name}
              </Txt>

              <View style={styles.meta}>
                <Txt medium style={styles.text}>
                  {this.roundNumber(this.props.percentage, 2).toLocaleString(
                    "de-DE"
                  )}%
                </Txt>
                {this.props.shareBar !== true ? (
                  <View style={styles.icon}><ChevronRight /></View>
                ) : null}
              </View>
            </Animated.View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default ResultBar;
