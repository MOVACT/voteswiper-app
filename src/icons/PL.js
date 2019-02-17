import React from "react";
import Svg, { Defs, Rect, G, Mask, Use, Path } from "react-native-svg";

const SvgPl = props => (
  <Svg width={42} height={30} viewBox="0 0 42 30" {...props}>
    <Defs>
      <Rect id="pl_svg__a" width={42} height={30} rx={2} />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="pl_svg__b" fill="#fff">
        <Use xlinkHref="#pl_svg__a" />
      </Mask>
      <Use fill="#FFF" xlinkHref="#pl_svg__a" />
      <Path fill="#EB2A50" d="M0 14h42v16H0z" mask="url(#pl_svg__b)" />
    </G>
  </Svg>
);

export default SvgPl;