import {isIphoneX} from 'util/iPhoneXHelper';
import {Header} from 'react-navigation-stack';

const headerHeight = () => {
  if (isIphoneX()) {
    return Header.HEIGHT + 30;
  }
  return Header.HEIGHT;
};

export default headerHeight;
