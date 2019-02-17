import React from "react";
import Svg, { Defs, Rect, Path, G, Mask, Use } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const SvgDe = props => (
  <Svg width={42} height={30} viewBox="0 0 42 30" {...props}>
    <Defs>
      <Rect id="de_svg__a" width={42} height={30} rx={2} />
      <Path id="de_svg__d" d="M0 10h42v10H0z" />
      <Path id="de_svg__f" d="M0 20h42v10H0z" />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="de_svg__b" fill="#fff">
        <Use xlinkHref="#de_svg__a" />
      </Mask>
      <Use fill="#FFF" xlinkHref="#de_svg__a" />
      <Path fill="#262626" d="M0 0h42v10H0z" mask="url(#de_svg__b)" />
      <G mask="url(#de_svg__b)">
        <Use fill="#000" filter="url(#de_svg__c)" xlinkHref="#de_svg__d" />
        <Use fill="#F01515" xlinkHref="#de_svg__d" />
      </G>
      <G mask="url(#de_svg__b)">
        <Use fill="#000" filter="url(#de_svg__e)" xlinkHref="#de_svg__f" />
        <Use fill="#FFD521" xlinkHref="#de_svg__f" />
      </G>
    </G>
  </Svg>
);

export default SvgDe;