import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

class BoxGradient extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <View style={styles.shadow}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['#222043', '#000000']}
          style={styles.root}
        >
          {this.props.children}
        </LinearGradient>
      </View>
    );
  }
}

export default BoxGradient;
