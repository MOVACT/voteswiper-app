import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

interface Props {
  noPadding?: boolean;
}

const Container: React.FC<Props> = ({noPadding = false, children}) => {
  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 0, y: 0}}
      colors={['#392F52', '#7577BD']}
      style={[styles.root, noPadding ? styles.noPadding : null]}>
      {children}
    </LinearGradient>
  );
};

export default Container;
