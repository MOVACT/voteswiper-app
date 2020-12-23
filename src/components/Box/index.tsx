import React from 'react';
import {GestureResponderEvent, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonGradient from '../ButtonGradient';
import styles from './styles';

interface Props {
  actionText?: string;
  actionOnPress: (event?: GestureResponderEvent) => void;
  withBorder?: boolean;
  topMargin?: number;
}

const Box: React.FC<Props> = ({
  topMargin = 30,
  actionText,
  actionOnPress,
  withBorder = false,
  children,
}) => {
  return (
    <View>
      <View style={[styles.shadow, {marginTop: topMargin}]}>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          colors={['#D9DAEB', '#ffffff']}
          style={[
            styles.root,
            actionText ? styles.withAction : null,
            withBorder === true ? styles.withBorder : null,
          ]}>
          {children}
        </LinearGradient>
      </View>

      {actionText ? (
        <View style={styles.action}>
          <ButtonGradient text={actionText} onPress={actionOnPress} />
        </View>
      ) : null}
    </View>
  );
};

export default Box;
