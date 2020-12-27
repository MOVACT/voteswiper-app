import React from 'react';
import PropTypes from 'prop-types';
import {TouchableWithoutFeedback, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Txt from 'components/Txt';
import styles from '../styles';
import t from 'util/t';

class YesButton extends React.Component {
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
        disabled={this.props.disabled}>
        <View style={styles.yesNoButton}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={[
              this.state.active === true ? '#12A73B' : '#00E640',
              '#12A73B',
            ]}
            style={styles.yesNoButtonBg}
          />

          <View style={styles.yesNoButtonInner}>
            <Txt style={styles.yesNoButtonText} medium>
              {t('swiper.yes')}
            </Txt>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default YesButton;
