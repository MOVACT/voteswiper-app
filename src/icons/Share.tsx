import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SvgShare: React.FC<SvgProps> = (props) => (
  <Svg width="20" height="26" viewBox="0 0 10 13" {...props}>
    <Path
      fill="#FFF"
      d="M5.56 1.93v2.03h3.33c.61 0 1.11.5 1.11 1.12v6.8C10 12.5 9.5 13 8.9 13H1.1C.5 13 0 12.5 0 11.87V5.08c0-.62.5-1.12 1.1-1.12h3.34V1.93l-.62.64a.54.54 0 0 1-.79 0 .57.57 0 0 1 0-.8L4.61.17a.54.54 0 0 1 .78 0l1.58 1.6c.21.22.21.57 0 .8a.55.55 0 0 1-.79 0l-.62-.64zM4.44 5.1H1.11v6.78H8.9V5.09H5.56v2.26c0 .31-.25.56-.56.56a.56.56 0 0 1-.56-.56V5.09zM2.78 3.96v1.13h4.44V3.96H2.78zm1.66 0h1.12v1.13H4.44V3.96z"
    />
  </Svg>
);

export default SvgShare;
