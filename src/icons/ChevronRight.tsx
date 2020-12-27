import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SvgChevronRight: React.FC<SvgProps> = (props) => (
  <Svg width={7} height={11} viewBox="0 0 7 11" {...props}>
    <Path
      fill="#FFF"
      fillRule="evenodd"
      d="M.26 1.78A1.02 1.02 0 0 1 1.7.35l4.08 4.08c.39.4.39 1.03 0 1.43L1.7 9.94A1.02 1.02 0 0 1 .26 8.5l3.36-3.37L.25 1.78h.01z"
    />
  </Svg>
);

export default SvgChevronRight;
