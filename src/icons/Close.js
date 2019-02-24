import React from "react";
import Svg, { Path } from "react-native-svg";

const SvgClose = props => (
  <Svg width="19" height="19" viewBox="0 0 19 19" {...props}>
    <Path
      fill="#FFF"
      fillRule="evenodd"
      d="M17.56 14.72a2 2 0 0 1-2.84 2.84L9.08 11.9l-5.66 5.66a2 2 0 0 1-2.84-2.84l5.66-5.64L.6 3.4A2 2 0 0 1 3.44.56L9.1 6.22 14.74.56a2 2 0 1 1 2.84 2.84l-5.66 5.66 5.66 5.64-.02.02z"
    />
  </Svg>
);

export default SvgClose;