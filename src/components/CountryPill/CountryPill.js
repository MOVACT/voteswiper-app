import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Txt } from 'components';
import styles from './styles';
import { ArrowRightCircle, DE, FR, PL, AT } from '../../icons';

class CountryPill extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    locale: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    locale: null,
    title: '',
    subTitle: '',
    onPress: () => {},
    disabled: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  getFlag = () => {
    switch(this.props.locale) {
      case "de":
        return <DE />
      case "fr":
        return <FR />
      case "pl":
        return <PL />
      case "at":
        return <AT />;
    }

    return <View />;
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
      >
        <View
          style={[
            styles.shadow,
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
            <View style={styles.flag}>
              {this.getFlag()}
            </View>
            <View style={styles.content}>
              <Txt medium style={styles.title}>{this.props.name}</Txt>
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

export default CountryPill;
