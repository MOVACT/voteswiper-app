import React from 'react';
import Svg, {Defs, Rect, G, Mask, Use, Path, SvgProps} from 'react-native-svg';

const SvgNl: React.FC<SvgProps> = (props) => (
  <Svg width={42} height={30} viewBox="0 0 42 30" {...props}>
    <Defs>
      <Rect id="nl_svg__a" width={42} height={30} rx={2} />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="nl_svg__b" fill="#fff">
        <Use xlinkHref="#nl_svg__a" />
      </Mask>
      <Use fill="#FFF" xlinkHref="#nl_svg__a" />
      <Path fill="#CA2B39" d="M0 0h42v10H0z" mask="url(#nl_svg__b)" />
      <Path fill="#2C56A2" d="M0 20h42v10H0z" mask="url(#nl_svg__b)" />
    </G>
  </Svg>
);

export default SvgNl;
