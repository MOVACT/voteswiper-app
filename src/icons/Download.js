import React from "react";
import Svg, { Path } from "react-native-svg";

const SvgDownload = props => (
  <Svg width="10" height="12" viewBox="0 0 10 12" {...props}>
    <Path fill="#000000" d="M1.36 5.07c-.24-.28-.13-.51.24-.51h6.78c.37 0 .48.23.24.51l-3.2 3.87a.53.53 0 0 1-.86 0l-3.2-3.87zM9.26 12H.82c-.43 0-.78-.43-.78-.78 0-.43.35-.78.78-.78h8.44c.43 0 .78.43.78.78 0 .43-.35.78-.78.78z" />
    <Path fill="#000000" d="M3.82 5.22v-4C3.82.55 4.49 0 5.04 0c.67 0 1.22.55 1.22 1.22v4c0 .68-.67 1.22-1.22 1.22-.67 0-1.22-.54-1.22-1.22z" />
  </Svg>
);

export default SvgDownload;