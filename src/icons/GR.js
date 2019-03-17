import React from "react";
import Svg, { Defs, Rect, G, Mask, Use, Path } from "react-native-svg";

const SvgGr = props => (
  <Svg width={42} height={30} viewBox="0 0 42 30" {...props}>
    <Defs>
      <Rect id="gr_svg__a" width={42} height={30} rx={2} />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="gr_svg__b" fill="#fff">
        <Use xlinkHref="#gr_svg__a" />
      </Mask>
      <Use fill="#FFF" xlinkHref="#gr_svg__a" />
      <Path
        fill="#1C6DC1"
        d="M20 20h-8v-8h8v4h22v4H20zm0-20h22v4H20v4h-8V0h8zM0 0h8v8H0V0zm20 8h22v4H20V8zM0 24h42v4H0v-4zm0-12h8v8H0v-8z"
        mask="url(#gr_svg__b)"
      />
    </G>
  </Svg>
);

export default SvgGr;