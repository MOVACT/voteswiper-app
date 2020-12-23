import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

interface Props {
  withPadding?: boolean;
  noPadding?: boolean;
}

const Container: React.FC<Props> = ({
  withPadding = false,
  noPadding = false,
  children,
}) => {
  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 0, y: 0}}
      colors={['#392F52', '#7577BD']}
      style={[
        styles.root,
        withPadding ? styles.withPadding : null,
        noPadding ? styles.noPadding : null,
      ]}>
      {children}
    </LinearGradient>
  );
};

export default Container;
