import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SvgCheck: React.FC<SvgProps> = (props) => (
  <Svg width={14} height={10} viewBox="0 0 100 72" {...props}>
    <Path
      fill="#FFF"
      d="M2.29 39.72c-6.86-6.86 3.42-17.15 10.28-10.29L37.14 54 87.43 3.15c6.85-6.86 17.14 3.42 10.28 10.28l-55.43 56a7.24 7.24 0 0 1-10.28 0L2.28 39.71z"
    />
  </Svg>
);

export default SvgCheck;
