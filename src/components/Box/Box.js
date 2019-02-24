import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonGradient from '../ButtonGradient/ButtonGradient';
import styles from './styles';

class Box extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    actionText: PropTypes.string,
    actionOnPress: PropTypes.func,
    withBorder: PropTypes.bool,
    topMargin: PropTypes.number,
  };

  static defaultProps = {
    actionText: '',
    actionOnPress: () => { },
    withBorder: false,
    topMargin: 30,
  };

  render() {
    return (
      <View>
        <View style={[styles.shadow, { marginTop: this.props.topMargin }]}>
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={['#D9DAEB', '#ffffff']}
            style={[
              styles.root,
              this.props.actionText !== '' ? styles.withAction : null,
              this.props.withBorder === true ? styles.withBorder : null,
            ]}
          >
            {this.props.children}
          </LinearGradient>
        </View>

        {this.props.actionText !== '' ?
          <View style={styles.action}>
            <ButtonGradient text={this.props.actionText} onPress={this.props.actionOnPress} />
          </View>
          : null}
      </View>
    );
  }
}

export default Box;
