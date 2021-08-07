import ArrowLeft from 'icons/ArrowLeft';
import ArrowRight from 'icons/ArrowRight';
import React from 'react';
import {GestureResponderEvent, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import rtl from '../../../../rtl';
import styles from './styles';

interface Props {
  type: 'previous' | 'next';
  disabled?: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const NavigationButton: React.FC<Props> = ({onPress, disabled, type}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      disabled={disabled}>
      <LinearGradient
        start={{x: 1, y: 1}}
        end={{x: 0, y: 0}}
        colors={['#464872', '#5D5D94']}
        style={[styles.bg, disabled ? styles.disabled : {}]}>
        {type === 'previous' ? (
          <ArrowLeft style={rtl.mirror} />
        ) : (
          <ArrowRight style={rtl.mirror} />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default NavigationButton;
