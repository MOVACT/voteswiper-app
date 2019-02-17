import React from "react";
import Svg, { Defs, Rect, G, Mask, Use, Path } from "react-native-svg";

const SvgFr = props => (
  <Svg width={42} height={30} viewBox="0 0 42 30" {...props}>
    <Defs>
      <Rect id="fr_svg__a" width={42} height={30} rx={2} />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="fr_svg__b" fill="#fff">
        <Use xlinkHref="#fr_svg__a" />
      </Mask>
      <Use fill="#FFF" xlinkHref="#fr_svg__a" />
      <Path fill="#F44653" d="M28 0h14v30H28z" mask="url(#fr_svg__b)" />
      <Path fill="#1035BB" d="M0 0h14v30H0z" mask="url(#fr_svg__b)" />
    </G>
  </Svg>
);

export default SvgFr;