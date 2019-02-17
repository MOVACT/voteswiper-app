import React from "react";
import Svg, { Path } from "react-native-svg";

const SvgCircleArrowRight = props => (
  <Svg viewBox="0 0 200 200" fill="#8186D7" {...props}>
    <Path
      fillRule="evenodd"
      d="M100 200C44.77 200 0 155.23 0 100S44.77 0 100 0s100 44.77 100 100-44.77 100-100 100zM82.97 66h-.1l32.52 33-32.42 33a10.11 10.11 0 0 0 .92 13.07 9.75 9.75 0 0 0 12.88.93l39.41-40a10.1 10.1 0 0 0 0-14L96.77 52a9.75 9.75 0 0 0-12.88.93A10.11 10.11 0 0 0 82.97 66z"
    />
  </Svg>
);

export default SvgCircleArrowRight;