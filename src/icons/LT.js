import React from "react";
import Svg, { Defs, Rect, G, Mask, Use, Path } from "react-native-svg";

const SvgLt = props => (
  <Svg width={42} height={30} viewBox="0 0 42 30" {...props}>
    <Defs>
      <Rect id="lt_svg__a" width={42} height={30} rx={2} />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="lt_svg__b" fill="#fff">
        <Use xlinkHref="#lt_svg__a" />
      </Mask>
      <Use fill="#FFF" xlinkHref="#lt_svg__a" />
      <Path fill="#118357" d="M0 10h42v10H0z" mask="url(#lt_svg__b)" />
      <Path fill="#D8343D" d="M0 20h42v10H0z" mask="url(#lt_svg__b)" />
      <Path fill="#FEC34B" d="M0 0h42v10H0z" mask="url(#lt_svg__b)" />
    </G>
  </Svg>
);

export default SvgLt;