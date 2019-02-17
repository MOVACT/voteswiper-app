import React from 'react';
import PropTypes from 'prop-types';
import Txt from '../Txt/Txt';
import styles from './styles';

class Title extends React.Component {
  static propTypes = {
    h1: PropTypes.bool,
    h5: PropTypes.bool,
    h5dark: PropTypes.bool,
    mainBig: PropTypes.bool,
    center: PropTypes.bool,
    textCenter: PropTypes.bool,
    uppercase: PropTypes.bool,
    children: PropTypes.node,
    style: PropTypes.any,
  };

  static defaultProps = {
    h1: false,
    h5: false,
    h5dark: false,
    mainBig: false,
    center: false,
    textCenter: false,
    uppercase: false,
    style: {},
  };

  render() {
    const { h1, h5, h5dark, mainBig, textCenter, center, uppercase, style } = this.props;

    return (
      <Txt
        style={[
          center ? styles.center : null,
          textCenter ? styles.textCenter : null,
          h1 ? styles.h1 : null,
          h5 ? styles.h5 : null,
          h5dark ? styles.h5 : null,
          h5dark ? styles.h5dark : null,
          mainBig ? styles.mainBig : null,
          style
        ]}
        medium={h1 || h5 || h5dark ? true : false}
      >
        {uppercase ? this.props.children.toUpperCase() : this.props.children}
      </Txt>
    );
  }
}

export default Title;
