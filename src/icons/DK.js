import React from "react";
import Svg, { Defs, Rect, G, Mask, Use, Path } from "react-native-svg";

const SvgDk = props => (
  <Svg width={42} height={30} viewBox="0 0 42 30" {...props}>
    <Defs>
      <Rect id="dk_svg__a" width={42} height={30} rx={2} />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="dk_svg__b" fill="#fff">
        <Use xlinkHref="#dk_svg__a" />
      </Mask>
      <Use fill="#FFF" xlinkHref="#dk_svg__a" />
      <Path
        fill="#EF264D"
        d="M12 0v12H0V2C0 .9.9 0 2 0h10zm6 0h22a2 2 0 0 1 2 2v10H18V0zm24 18v10a2 2 0 0 1-2 2H18V18h24zM12 30H2a2 2 0 0 1-2-2V18h12v12z"
        mask="url(#dk_svg__b)"
      />
    </G>
  </Svg>
);

export default SvgDk;