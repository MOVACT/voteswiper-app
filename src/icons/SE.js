import React from "react";
import Svg, { Defs, Rect, G, Mask, Use, Path } from "react-native-svg";

const SvgSe = props => (
  <Svg width={42} height={30} viewBox="0 0 42 30" {...props}>
    <Defs>
      <Rect id="se_svg__a" width={42} height={30} rx={2} />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="se_svg__b" fill="#fff">
        <Use xlinkHref="#se_svg__a" />
      </Mask>
      <Use fill="#FFF" xlinkHref="#se_svg__a" />
      <Path fill="#157CBB" d="M0 0h42v30H0z" mask="url(#se_svg__b)" />
      <Path
        fill="#FFD34D"
        d="M0 18h12v12h6V18h24v-6H18V0h-6v12H0z"
        mask="url(#se_svg__b)"
      />
    </G>
  </Svg>
);

export default SvgSe;