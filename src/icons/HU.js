import React from "react";
import Svg, { Defs, Rect, G, Mask, Use, Path } from "react-native-svg";

const SvgHu = props => (
  <Svg width={42} height={30} viewBox="0 0 42 30" {...props}>
    <Defs>
      <Rect id="hu_svg__a" width={42} height={30} rx={2} />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="hu_svg__b" fill="#fff">
        <Use xlinkHref="#hu_svg__a" />
      </Mask>
      <Use fill="#FFF" xlinkHref="#hu_svg__a" />
      <Path fill="#E03D52" d="M0 0h42v10H0z" mask="url(#hu_svg__b)" />
      <Path fill="#5A9165" d="M0 20h42v10H0z" mask="url(#hu_svg__b)" />
    </G>
  </Svg>
);

export default SvgHu;