import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moment, cdn } from 'util';
import ArrowRightCircle from '../../icons/ArrowRightCircle';
import Txt from '../Txt/Txt';
import styles from './styles';

class ElectionPill extends React.Component {
  static propTypes = {
    date: PropTypes.string,
    note: PropTypes.string,
    active: PropTypes.bool,
    shortName: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    title: '',
    subTitle: '',
    note: '',
    onPress: () => {},
    disabled: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
        onPressIn={() => {
          this.setState({ active: true });
        }}
        onPressOut={() => {
          this.setState({ active: false });
        }}
        /*disabled={!this.props.active}*/
      >
        <View
          style={[
            styles.shadow,
            // this.props.active ? {} : styles.disabled,
          ]}
        >
          <View style={styles.cardHolder}>
            <Image
              source={{ uri: cdn(this.props.card)}}
              resizeMode="cover"
              style={styles.card}
            />
          </View>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[
              '#fff',
              this.state.active ? '#D2DCFD' : '#EFF3FF',
            ]}
            style={styles.root}
          >
            <View style={styles.content}>
              <Txt medium style={styles.title}>{this.props.name}</Txt>
              <Txt medium style={styles.subTitle}>
                {moment(this.props.voting_day).format('LL')}
              </Txt>
            </View>
            <View style={styles.iconHolder}>
              <ArrowRightCircle fill="#8186D7" width={20} height={20} />
            </View>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ElectionPill;
