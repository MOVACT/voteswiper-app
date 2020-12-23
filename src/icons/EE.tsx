import React from 'react';
import Svg, {Defs, Rect, G, Mask, Use, Path, SvgProps} from 'react-native-svg';

const SvgEe: React.FC<SvgProps> = (props) => (
  <Svg width={42} height={30} viewBox="0 0 42 30" {...props}>
    <Defs>
      <Rect id="ee_svg__a" width={42} height={30} rx={2} />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="ee_svg__b" fill="#fff">
        <Use xlinkHref="#ee_svg__a" />
      </Mask>
      <Use fill="#FFF" xlinkHref="#ee_svg__a" />
      <Path fill="#262626" d="M0 10h42v10H0z" mask="url(#ee_svg__b)" />
      <Path fill="#5DA8F1" d="M0 0h42v10H0z" mask="url(#ee_svg__b)" />
    </G>
  </Svg>
);

export default SvgEe;
