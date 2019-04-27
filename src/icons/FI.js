import React from "react";
import Svg, { Defs, Rect, G, Mask, Use, Path } from "react-native-svg";

const SvgFi = props => (
  <Svg width={42} height={30} viewBox="0 0 42 30" {...props}>
    <Defs>
      <Rect id="fi_svg__a" x={0} y={0} width={42} height={30} rx={2} />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="fi_svg__b" fill="#fff">
        <Use xlinkHref="#fi_svg__a" />
      </Mask>
      <Rect
        stroke="#F5F5F5"
        strokeWidth={0.5}
        x={0.25}
        y={0.25}
        width={41.5}
        height={29.5}
        fill="#fff"
        rx={2}
      />
      <Path
        fill="#0848A6"
        mask="url(#fi_svg__b)"
        d="M-2 18h14v14h6V18h26v-6H18V-2h-6v14H-2z"
      />
    </G>
  </Svg>
);

export default SvgFi;