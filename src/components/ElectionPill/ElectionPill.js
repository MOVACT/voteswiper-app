import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'util';
import { moment } from 'common';
import { Txt } from 'components';
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
        disabled={!this.props.active}
      >
        <View
          style={[
            styles.shadow,
            this.props.active ? {} : styles.disabled,
          ]}
        >
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
              <Txt medium style={styles.title}>{this.props.shortName}</Txt>
              <Txt medium style={styles.subTitle}>
                {this.props.active ? moment(this.props.date).format('LL') : this.props.note}
              </Txt>
            </View>
            {this.props.active === true ?
              <View style={styles.iconHolder}>
                <Icon
                  name="play-circle"
                  size={20}
                  color="#8186D7"
                  style={styles.icon}
                />
              </View>
              : null}
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ElectionPill;
