import { isIphoneX } from 'util';
import { Header } from 'react-navigation';

const headerHeight = () => {
  console.log(Header);
  if (isIphoneX()) {
    return Header.HEIGHT + 30;
  }
  return Header.HEIGHT;
}

export default headerHeight;
