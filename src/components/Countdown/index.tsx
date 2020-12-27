import React from 'react';
import {View} from 'react-native';
import Txt from '../Txt';
import moment from 'util/momentLocale';
import styles from './styles';
import {useApp} from 'contexts/app';

interface Props {
  date: string;
}

const calculateRemainingTime = (date: string) => {
  const total =
    Date.parse(moment(date).toDate()) - Date.parse(new Date().toISOString());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
};

const Countdown: React.FC<Props> = ({date}) => {
  const interval = React.useRef(null);
  const {t} = useApp();
  const [remainingTime, setRemainingTime] = React.useState<{
    total: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>(calculateRemainingTime(date));

  const updateCountdown = React.useCallback(() => {
    setRemainingTime(calculateRemainingTime(date));
  }, [date]);

  React.useEffect(() => {
    interval.current = setInterval(updateCountdown, 1000);

    () => {
      clearInterval(interval.current);
    };
  }, [updateCountdown]);

  return (
    <View style={styles.countdown}>
      {remainingTime.days > 0 ? (
        <View style={styles.column}>
          <Txt bold style={styles.number}>
            {remainingTime.days}
          </Txt>
          <Txt medium style={styles.label}>
            {t('countdown.days')}
          </Txt>
        </View>
      ) : null}

      <View style={styles.column}>
        <Txt bold style={styles.number}>
          {('0' + remainingTime.hours).slice(-2)}
        </Txt>
        <Txt medium style={styles.label}>
          {t('countdown.hours')}
        </Txt>
      </View>

      <View style={styles.column}>
        <Txt bold style={styles.number}>
          {('0' + remainingTime.minutes).slice(-2)}
        </Txt>
        <Txt medium style={styles.label}>
          {t('countdown.minutes')}
        </Txt>
      </View>

      <View style={styles.column}>
        <Txt bold style={styles.number}>
          {('0' + remainingTime.seconds).slice(-2)}
        </Txt>
        <Txt medium style={styles.label}>
          {t('countdown.seconds')}
        </Txt>
      </View>
    </View>
  );
};

export default Countdown;
