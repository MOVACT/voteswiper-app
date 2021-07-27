import {useApp} from 'contexts/app';
import React from 'react';
import {
  GestureResponderEvent,
  Image,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Election} from 'types/api';
import moment from 'util/momentLocale';
import ArrowRightCircle from '../../icons/ArrowRightCircle';
import rtl from '../../rtl';
import Txt from '../Txt';
import styles from './styles';

interface Props extends Election {
  onPress: (event: GestureResponderEvent) => void;
}

const ElectionPill: React.FC<Props> = ({
  onPress,
  card,
  name,
  voting_day,
  playable,
  playable_date,
}) => {
  const {t, language} = useApp();
  const [clickActive, setActiveClick] = React.useState(false);

  moment.locale(language || 'de');

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={() => {
        setActiveClick(true);
      }}
      onPressOut={() => {
        setActiveClick(false);
      }}
      disabled={!playable}>
      <View style={[styles.shadow, playable ? {} : styles.disabled]}>
        <View style={styles.cardHolder}>
          <Image
            source={{uri: card.public_link}}
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
              {playable
                ? moment(voting_day).format('LL')
                : t('electionPill.availableFrom', [
                    moment(playable_date).format('LL'),
                  ])}
            </Txt>
          </View>
          <View>
            <ArrowRightCircle
              fill="#8186D7"
              width={20}
              height={20}
              style={rtl.mirror}
            />
          </View>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ElectionPill;
