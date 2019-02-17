import React from "react";
import Svg, { G, Path, Circle } from "react-native-svg";

const SvgCog = props => (
  <Svg width={22} height={22} viewBox="0 0 22 22" {...props}>
    <G fill="none" fillRule="evenodd">
      <Path
        fill="#FFF"
        fillRule="nonzero"
        d="M5.28 1.6c.96-.58 2-1.02 3.11-1.3a2.75 2.75 0 0 0 5.22 0c1.1.28 2.15.72 3.1 1.3a2.75 2.75 0 0 0 3.7 3.7c.57.94 1 1.97 1.28 3.1a2.75 2.75 0 0 0 0 5.2 11.2 11.2 0 0 1-1.29 3.1 2.75 2.75 0 0 0-3.7 3.7c-.94.58-1.97 1.02-3.1 1.3a2.75 2.75 0 0 0-5.2 0 11.2 11.2 0 0 1-3.1-1.3 2.75 2.75 0 0 0-3.7-3.7c-.6-.95-1.03-2-1.3-3.1a2.75 2.75 0 0 0 0-5.2 11.2 11.2 0 0 1 1.3-3.1 2.75 2.75 0 0 0 3.7-3.7h-.02zM11 15.4a4.4 4.4 0 1 0 0-8.8 4.4 4.4 0 0 0 0 8.8z"
      />
      <Circle cx={11} cy={11} r={2.2} fill="#DB67AE" />
    </G>
  </Svg>
);

export default SvgCog;