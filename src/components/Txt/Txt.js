import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import styles from "./styles";

class Txt extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    // style: PropTypes.oneOfType([PropTypes.object, PropTypes.array, TextPropTypes.style]),
    style: PropTypes.any,
    medium: PropTypes.bool,
    bold: PropTypes.bool,
    copy: PropTypes.bool,
    center: PropTypes.bool,
  };

  static defaultProps = {
    style: {},
    medium: false,
    bold: false,
    copy: false,
    center: false,
  };

  render() {
    const { medium, bold, style, copy, center } = this.props;

    return (
      <Text
        style={[
          styles.text,
          medium ? styles.textMedium : null,
          bold ? styles.textBold : null,
          copy ? styles.copy : null,
          center ? styles.center : null,
          style
        ]}
        allowFontScaling={false}
      >
        {this.props.children}
      </Text>
    );
  }
}

export default Txt;
