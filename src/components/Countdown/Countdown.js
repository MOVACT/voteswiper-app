import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Txt } from 'components';
import { moment, t } from 'util';
import styles from './styles';

class Countdown extends React.Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.interval = null;
    this.state = this.remainingTime(props.date);
  }

  componentDidMount() {
    this.interval = setInterval(this.updateCountdown, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateCountdown = () => {
    this.setState({
      ...this.remainingTime(this.props.date),
    });
  }

  remainingTime = date => {
    const t = Date.parse(moment(date).toDate()) - Date.parse(new Date());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
      total: t,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  render() {
    return (
      <View style={styles.countdown}>
        {this.state.days > 0 ?
          <View style={styles.column}>
            <Txt bold style={styles.number}>{this.state.days}</Txt>
            <Txt medium style={styles.label}>{t('countdown.days')}</Txt>
          </View>
          : null}

        <View style={styles.column}>
          <Txt bold style={styles.number}>{('0' + this.state.hours).slice(-2)}</Txt>
          <Txt medium style={styles.label}>{t('countdown.hours')}</Txt>
        </View>

        <View style={styles.column}>
          <Txt bold style={styles.number}>{('0' + this.state.minutes).slice(-2)}</Txt>
          <Txt medium style={styles.label}>{t('countdown.minutes')}</Txt>
        </View>

        <View style={styles.column}>
          <Txt bold style={styles.number}>{('0' + this.state.seconds).slice(-2)}</Txt>
          <Txt medium style={styles.label}>{t('countdown.secondy')}</Txt>
        </View>
      </View>
    );
  }
}

export default Countdown;
