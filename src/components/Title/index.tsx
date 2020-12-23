import React from 'react';
import Txt from '../Txt';
import styles from './styles';
import {StyleProp, TextStyle} from 'react-native';

interface Props {
  h1?: boolean;
  h5?: boolean;
  h5dark?: boolean;
  mainBig?: boolean;
  center?: boolean;
  textCenter?: boolean;
  uppercase?: boolean;
  style?: StyleProp<TextStyle>;
  children: string;
}

const Title: React.FC<Props> = ({
  h1 = false,
  h5 = false,
  h5dark = false,
  mainBig = false,
  center = false,
  textCenter = false,
  uppercase = false,
  style,
  children,
}) => {
  return (
    <Txt
      style={[
        center ? styles.center : null,
        textCenter ? styles.textCenter : null,
        h1 ? styles.h1 : null,
        h5 ? styles.h5 : null,
        h5dark ? styles.h5 : null,
        h5dark ? styles.h5dark : null,
        mainBig ? styles.mainBig : null,
        style,
      ]}
      medium={h1 || h5 || h5dark ? true : false}>
      {uppercase ? children.toUpperCase() : children}
    </Txt>
  );
};

export default Title;
