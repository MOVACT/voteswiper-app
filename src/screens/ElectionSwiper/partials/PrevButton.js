import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'util';
import styles from '../styles';

class PrevButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        disabled={this.props.disabled}
      >
        <LinearGradient
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={['#464872', '#5D5D94']}
          style={[
            styles.headerButton,
            styles.headerNavButtonPrev,
            this.props.disabled ? styles.headerNavButtonDisabled : {},
          ]}
        >
          <Icon
            name="arrow-left"
            size={8}
            color={this.props.disabled ? "rgba(0,0,0,0.5)" : "#fff"}
          />
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

export default PrevButton;
