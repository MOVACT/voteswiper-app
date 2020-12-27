import Txt from 'components/Txt';
import {useApp} from 'contexts/app';
import React from 'react';
import {
  GestureResponderEvent,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  type: 'yes' | 'no';
}

const YesButton: React.FC<Props> = ({onPress, type, disabled = false}) => {
  const [active, setActive] = React.useState(false);
  const {t} = useApp();

  const colors = {
    yes: [active === true ? '#12A73B' : '#00E640', '#12A73B'],
    no: [active === true ? '#B92727' : '#F03434', '#B92727'],
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={() => setActive(true)}
      onPressOut={() => setActive(false)}
      disabled={disabled}>
      <View style={styles.button}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={colors[type]}
          style={styles.bg}>
          <Txt style={styles.text} medium>
            {t(type === 'yes' ? 'swiper.yes' : 'swiper.no')}
          </Txt>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default YesButton;
