import React from 'react';
import Svg, {Defs, Rect, G, Mask, Use, Path, SvgProps} from 'react-native-svg';

const SvgRo: React.FC<SvgProps> = (props) => (
  <Svg width={42} height={30} viewBox="0 0 42 30" {...props}>
    <Defs>
      <Rect id="ro_svg__a" width={42} height={30} rx={2} />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="ro_svg__b" fill="#fff">
        <Use xlinkHref="#ro_svg__a" />
      </Mask>
      <Use fill="#FFF" xlinkHref="#ro_svg__a" />
      <Path fill="#E5253D" d="M20 0h22v30H20z" mask="url(#ro_svg__b)" />
      <Path fill="#0A3D9C" d="M0 0h14v30H0z" mask="url(#ro_svg__b)" />
      <Path fill="#FFD955" d="M14 0h14v30H14z" mask="url(#ro_svg__b)" />
    </G>
  </Svg>
);

export default SvgRo;
