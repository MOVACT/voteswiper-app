import React from "react";
import Svg, { Path } from "react-native-svg";

const SvgArrowRight = props => (
  <Svg width={16} height={14} viewBox="0 0 16 14" {...props}>
    <Path
      fill="#FFF"
      fillRule="evenodd"
      d="M11.37 8.3H1.5a1.3 1.3 0 1 1 0-2.6h9.87l-3-2.99A1.3 1.3 0 1 1 10.23.89l5.2 5.2c.5.5.5 1.31 0 1.82l-5.2 5.2a1.3 1.3 0 0 1-1.84-1.82l2.99-2.99z"
    />
  </Svg>
);

export default SvgArrowRight;