import React from 'react';
import Svg, {Defs, G, Mask, Path, Rect, SvgProps, Use} from 'react-native-svg';

const SvgAt: React.FC<SvgProps> = (props) => (
  <Svg width={42} height={30} viewBox="0 0 42 30" {...props}>
    <Defs>
      <Rect id="at_svg__a" width={42} height={30} rx={2} />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="at_svg__b" fill="#fff">
        <Use xlinkHref="#at_svg__a" />
      </Mask>
      <Use fill="#FFF" xlinkHref="#at_svg__a" />
      <Path
        fill="#F64253"
        d="M0 0h42v10H0zm0 20h42v10H0z"
        mask="url(#at_svg__b)"
      />
    </G>
  </Svg>
);

export default SvgAt;
