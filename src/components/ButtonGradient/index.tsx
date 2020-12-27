import React from 'react';
import {
  GestureResponderEvent,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Txt from '../Txt';
import styles from './styles';

interface Props {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

const ButtonGradient: React.FC<Props> = ({text, disabled = false, onPress}) => {
  const [active, setActive] = React.useState(false);

  const color1 = React.useMemo(() => {
    if (disabled) {
      return '#49223A';
    }

    if (active === true) {
      return '#8186D7';
    }

    return '#DB67AE';
  }, [active, disabled]);

  const color2 = React.useMemo(() => {
    if (disabled) {
      return '#2B2C47';
    }

    return '#8186D7';
  }, [disabled]);

  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        setActive(true);
      }}
      onPressOut={() => {
        setActive(false);
      }}
      onPress={onPress}
      style={styles.buttonOuter}
      disabled={disabled}>
      <View style={styles.button}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={[color1, color2]}
          style={[styles.bg, active === true ? styles.bgActive : {}]}
        />
        <View style={styles.inner}>
          <Txt style={styles.text} medium>
            {text}
          </Txt>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ButtonGradient;
