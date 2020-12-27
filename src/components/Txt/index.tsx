import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import styles from './styles';

interface Props {
  style?: StyleProp<TextStyle>;
  medium?: boolean;
  bold?: boolean;
  copy?: boolean;
  center?: boolean;
}

const Txt: React.FC<Props> = ({
  medium = false,
  bold = false,
  copy = false,
  center = false,
  style,
  children,
}) => {
  return (
    <Text
      style={[
        styles.text,
        medium ? styles.textMedium : null,
        bold ? styles.textBold : null,
        copy ? styles.copy : null,
        center ? styles.center : null,
        style,
      ]}
      allowFontScaling={false}>
      {children}
    </Text>
  );
};

export default Txt;
