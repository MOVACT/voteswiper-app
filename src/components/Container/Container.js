import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

class Container extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    withPadding: PropTypes.bool,
    noPadding: PropTypes.bool,
  };

  static defaultProps = {
    withPadding: false,
    noPadding: false,
  };

  render() {
    return (
      <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={['#392F52', '#7577BD']}
        style={[
          styles.root,
          this.props.withPadding ? styles.withPadding : null,
          this.props.noPadding ? styles.noPadding : null,
        ]}
      >
        {this.props.children}
      </LinearGradient>
    );
  }
}

export default Container;
