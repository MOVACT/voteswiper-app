import React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

const SvgCircleInfo: React.FC<SvgProps> = (props) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
    <G fill="none" fillRule="evenodd">
      <Path fill="#FFF" d="M10 0a10 10 0 1 1 0 20 10 10 0 0 1 0-20z" />
      <Path
        fill="#8186D7"
        fillRule="nonzero"
        d="M9 10a1 1 0 1 1 0-2h2a1 1 0 0 1 .96 1.27L10.33 15H11a1 1 0 0 1 0 2H9a1 1 0 0 1-.96-1.27L9.67 10H9zm2-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
      />
    </G>
  </Svg>
);

export default SvgCircleInfo;
