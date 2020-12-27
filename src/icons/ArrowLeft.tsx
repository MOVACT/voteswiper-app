import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SvgArrowLeft: React.FC<SvgProps> = (props) => (
  <Svg width={16} height={14} viewBox="0 0 16 14" {...props}>
    <Path
      fill="#FFF"
      fillRule="evenodd"
      d="M4.63 5.7h9.87a1.3 1.3 0 1 1 0 2.6H4.63l3 2.99a1.3 1.3 0 1 1-1.85 1.82l-5.2-5.2a1.3 1.3 0 0 1 0-1.82l5.2-5.2a1.3 1.3 0 0 1 1.84 1.82l-3 2.99h.01z"
    />
  </Svg>
);

export default SvgArrowLeft;
