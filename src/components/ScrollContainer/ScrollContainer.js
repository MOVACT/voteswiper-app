import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { headerHeight } from 'common';
import styles from './styles';

const height = headerHeight();

class ScrollContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    withPadding: PropTypes.bool,
  };

  static defaultProps = {
    withPadding: false,
  };

  render() {
    return (
      <View style={styles.flex}>
        <View style={styles.flex}>
          <ScrollView
           {...this.props}
           style={[{
             marginTop: headerHeight(),
           }, this.props.style]}
          >
            <View style={this.props.withPadding ? styles.withPadding : {}}>
              {this.props.children}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default ScrollContainer;
