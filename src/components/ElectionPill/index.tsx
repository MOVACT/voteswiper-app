import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Image,
  GestureResponderEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'util/momentLocale';
import t from 'util/t';
import cdn from 'util/cdn';
import ArrowRightCircle from '../../icons/ArrowRightCircle';
import Txt from '../Txt';
import styles from './styles';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  card: string;
  name: string;
  voting_day: string;
  active_date: string;
  active: boolean;
}

const ElectionPill: React.FC<Props> = ({
  onPress,
  card,
  name,
  voting_day,
  active_date,
  active,
}) => {
  const [clickActive, setActiveClick] = React.useState(false);

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={() => {
        setActiveClick(true);
      }}
      onPressOut={() => {
        setActiveClick(false);
      }}
      disabled={!active}>
      <View style={[styles.shadow, active ? {} : styles.disabled]}>
        <View style={styles.cardHolder}>
          <Image
            source={{uri: cdn(card)}}
            resizeMode="cover"
            style={styles.card}
          />
        </View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#fff', clickActive ? '#D2DCFD' : '#EFF3FF']}
          style={styles.root}>
          <View style={styles.content}>
            <Txt medium style={styles.title}>
              {name}
            </Txt>
            <Txt medium style={styles.subTitle}>
              {active
                ? moment(voting_day).format('LL')
                : t(
                    'electionPill.availableFrom',
                    moment(active_date).format('LL'),
                  )}
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

export default ElectionPill;
