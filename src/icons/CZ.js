import React from "react";
import Svg, { Defs, Rect, G, Mask, Use, Path } from "react-native-svg";

const SvgCz = props => (
  <Svg width={42} height={30} viewBox="0 0 42 30" {...props}>
    <Defs>
      <Rect id="cz_svg__a" width={42} height={30} rx={2} />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="cz_svg__b" fill="#fff">
        <Use xlinkHref="#cz_svg__a" />
      </Mask>
      <Use fill="#FFF" xlinkHref="#cz_svg__a" />
      <Path fill="#E8252A" d="M0 14h42v16H0z" mask="url(#cz_svg__b)" />
      <Path fill="#17579E" d="M0 0l20 15L0 30z" mask="url(#cz_svg__b)" />
    </G>
  </Svg>
);

export default SvgCz;