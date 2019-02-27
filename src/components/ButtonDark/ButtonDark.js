import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Txt from '../Txt/Txt';
import styles from './styles';

class ButtonDark extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    arrow: PropTypes.bool,
    icon: PropTypes.string,
    center: PropTypes.bool,
    outerStyle: PropTypes.any,
  };

  static defaultProps = {
    text: '',
    onPress: () => {},
    arrow: true,
    icon: '',
    center: false,
    outerStyle: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  render() {
    return (
      <TouchableHighlight
        onPressIn={() => {
          this.setState({
            active: true,
          });
        }}
        onPressOut={() => {
          this.setState({
            active: false,
          });
        }}
        onPress={this.props.onPress}
        underlayColor="rgba(0,0,0,0)"
        tvParallaxProperties={{
          shiftDistanceX: false,
          shiftDistanceY: 5,
          tiltAngle: 0.0,
          magnification: 1.05,
          pressMagnification: 0.95,
        }}
        style={styles.outerStyle}
      >
        <View style={styles.button}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,1)']}
            style={[
              styles.bg,
              this.state.active === true ? styles.bgActive : {},
            ]}
          />
          <View style={styles.inner}>
            {this.props.center === true ?
              <View style={styles.textWithIcon}>
                <Txt style={styles.text} medium>
                  {this.props.text}
                </Txt>
              </View>
              :
              <Txt style={styles.text} medium>
                {this.props.text}
              </Txt>
            }
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default ButtonDark;
