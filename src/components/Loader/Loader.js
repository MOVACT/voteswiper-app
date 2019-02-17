import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  loader: {
    flexDirection: 'row', justifyContent: 'center', paddingVertical: 50
  },
  loaderFull: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

class Loader extends React.Component {
  static propTypes = {
    fullscreen: PropTypes.bool,
  }
  static defaultProps = {
    fullscreen: false,
  };

  render() {
    return (
      <View style={[styles.loader, this.props.fullscreen ? styles.loaderFull : {}]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
}

export default Loader;