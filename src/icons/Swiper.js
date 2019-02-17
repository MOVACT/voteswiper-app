import React from "react";
import Svg, { Path } from "react-native-svg";

const SvgSwiper = props => (
  <Svg width={27} height={20} viewBox="0 0 27 20" {...props}>
    <Path
      fill="#FFF"
      fillRule="evenodd"
      d="M12.3 1.35l3.74 14.02-3.02-11.29 3.02 11.29c.26.97-.32 1.96-1.28 2.22l-8.74 2.35a1.8 1.8 0 0 1-2.21-1.29L.06 4.63a1.82 1.82 0 0 1 1.28-2.22L10.08.06a1.8 1.8 0 0 1 2.21 1.29zm3.9 17.55c1.32-.82 2-2.43 1.58-4.01L14.03.88 14 .78c.42-.61 1.2-.92 1.97-.72l8.78 2.35a1.81 1.81 0 0 1 1.29 2.22l-3.77 14.02a1.82 1.82 0 0 1-2.23 1.29l-3.83-1.03z"
    />
  </Svg>
);

export default SvgSwiper;