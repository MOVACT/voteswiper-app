import {isIphoneX} from 'util/iPhoneXHelper';

const headerHeight = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const height = useHeaderHeight();
  const height = 100;
  if (isIphoneX()) {
    return height + 30;
  }
  return height;
};

export default headerHeight;
