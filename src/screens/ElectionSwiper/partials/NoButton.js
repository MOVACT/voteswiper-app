import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Txt } from 'components';
import styles from '../styles';

class NoButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    onPress: () => {},
    disabled: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
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
        disabled={this.props.disabled}
      >
        <View style={styles.yesNoButton}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[this.state.active === true ? '#B92727' : '#F03434', '#B92727']}
            style={styles.yesNoButtonBg}
          />

          <View style={styles.yesNoButtonInner}>
            <Txt style={styles.yesNoButtonText} medium>Nein</Txt>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default NoButton;
