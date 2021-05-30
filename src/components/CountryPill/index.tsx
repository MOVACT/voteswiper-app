import ArrowRightCircle from 'icons/ArrowRightCircle';
import React from 'react';
import {
  GestureResponderEvent,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import getCountryFlag from 'util/getCountryFlag';
import Txt from '../Txt';
import styles from './styles';

interface Props {
  name: string;
  locale: string;
  onPress: (event: GestureResponderEvent) => void;
}

const CountryPill: React.FC<Props> = ({locale, name, onPress}) => {
  const [active, setActive] = React.useState(false);

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={() => {
        setActive(true);
      }}
      onPressOut={() => {
        setActive(false);
      }}>
      <View style={[styles.shadow]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#fff', active ? '#D2DCFD' : '#EFF3FF']}
          style={styles.root}>
          <View style={styles.flag}>{getCountryFlag(locale)}</View>
          <View style={styles.content}>
            <Txt medium style={styles.title}>
              {name}
            </Txt>
          </View>
          <View>
            <ArrowRightCircle fill="#8186D7" width={20} height={20} />
          </View>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CountryPill;
