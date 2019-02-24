import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Share, Platform, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShareIcon from '../../icons/Share';
import styles from './styles';

class ShareButton extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
  };

  static defaultProps = {
    url: undefined,
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          let message = this.props.message;

          if (Platform.OS === 'android') {
            message = `${message} ${this.props.url}`;
          }

          Share.share({
            message: message,
            title: this.props.title,
            url: this.props.url,
          });
        }}
      >
        <View style={styles.button}>
          <ShareIcon height={24} width={18} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default ShareButton;
