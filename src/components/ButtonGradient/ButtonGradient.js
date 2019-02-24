import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Txt from '../Txt/Txt';
import styles from './styles';

class ButtonGradient extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    text: '',
    onPress: () => { },
    disabled: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  color1 = () => {
    if (this.props.disabled) {
      return '#49223A';
    }

    if (this.state.active === true) {
      return '#8186D7';
    }

    return '#DB67AE';
  };

  color2 = () => {
    if (this.props.disabled) {
      return '#2B2C47';
    }

    return '#8186D7';
  };

  render() {
    return (
      <TouchableWithoutFeedback
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
        style={styles.buttonOuter}
        disabled={this.props.disabled}
      >
        <View style={styles.button}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[this.color1(), this.color2()]}
            style={[
              styles.bg,
              this.state.active === true ? styles.bgActive : {},
            ]}
          />
          <View style={styles.inner}>
            <Txt style={styles.text} medium>{this.props.text}</Txt>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ButtonGradient;
