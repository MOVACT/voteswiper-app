import React from "react";
import { inject, observer } from "mobx-react";
import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  Image,
  Easing
} from "react-native";
import PropTypes from "prop-types";
import Txt from 'components/Txt';
import FadeIn from 'components/FadeIn';
import ButtonGradient from 'components/ButtonGradient',
import Loader from 'components/Loader';
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";
import Result from "./Result";
import cdn from 'util/cdn';
import t from 'util/t';

class SelectParties extends React.Component {
  static propTypes = {
    swiper: PropTypes.object.isRequired,
    onShowResult: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedParties: [],
      animation: new Animated.Value(0),
      showResult: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad)
      }).start();
    }, 400);
  }

  hasEnoughParties = () => {
    if (
      this.props.swiper.parties[this.props.swiper.election.slug] === undefined
    ) {
      return false;
    }

    if (
      this.props.swiper.parties[this.props.swiper.election.slug].length === 0
    ) {
      return false;
    }

    return true;
  };

  closeResult = () => {
    this.setState(
      {
        showResult: false
      },
      () => {
        Animated.timing(this.state.animation, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.in(Easing.quad)
        }).start();
      }
    );
  };

  goToResult = () => {
    this.props.onShowResult();
    Animated.timing(this.state.animation, {
      toValue: 2,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.in(Easing.quad)
    }).start(() => {
      this.setState({
        showResult: true
      });
    });
  };

  isActive = slug => {
    if (
      this.props.swiper.parties[this.props.swiper.election.slug] === undefined
    ) {
      return false;
    }

    if (
      this.props.swiper.parties[this.props.swiper.election.slug].indexOf(slug) >
      -1
    ) {
      return true;
    }

    return false;
  };

  render() {
    if (this.props.swiper.loadingRecalculated) {
      return <Loader fullscreen />;
    }
  
    if (this.state.showResult) {
      return (
        <Result
          parties={this.props.swiper.election.parties}
          election={this.props.swiper.election}
          navigation={this.props.navigation}
          closeResult={() => {
            this.setState(
              {
                showResult: false
              },
              () => {
                Animated.timing(this.state.animation, {
                  toValue: 1,
                  duration: 250,
                  useNativeDriver: true,
                  easing: Easing.in(Easing.quad)
                }).start();
              }
            );
          }}
        />
      );
    }

    let delay = 200;

    const translateText = this.state.animation.interpolate({
      inputRange: [0, 0.75, 1, 2],
      outputRange: [-100, 0, 0, -100]
    });

    const translateAction = this.state.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [120, 0, 120]
    });

    const translateList = this.state.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 0, 30]
    });

    const opacityList = this.state.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, 1, 0]
    });

    return (
      <View style={styles.container}>
        <ScrollView>
          <Animated.View
            style={[
              styles.explainer,
              { transform: [{ translateY: translateText }] }
            ]}
          >
            <Txt white style={styles.explainerText}>
              {t('swiperSelectParties.text')}
            </Txt>

            <View style={styles.selectPartyActions}>
              <TouchableOpacity
                disabled={
                  typeof this.props.swiper.parties[
                  this.props.swiper.election.slug
                  ] !== "undefined" &&
                  this.props.swiper.parties[this.props.swiper.election.slug]
                    .length >= this.props.swiper.election.parties.length
                }
                onPress={() => {
                  this.props.swiper.selectAllParties(
                    this.props.swiper.election.parties
                  );
                }}
                style={[
                  styles.selectPartyAction,
                  typeof this.props.swiper.parties[
                    this.props.swiper.election.slug
                  ] !== "undefined" &&
                    this.props.swiper.parties[this.props.swiper.election.slug]
                      .length >= this.props.swiper.election.parties.length
                    ? styles.selectPartyActionDisabled
                    : null
                ]}
              >
                <Txt white medium style={styles.selectPartyActionText}>
                  {t('swiperSelectParties.checkAll')}
                </Txt>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.swiper.unselectAllParties();
                }}
                disabled={this.props.swiper.isUnselected()}
                style={[
                  styles.selectPartyAction,
                  this.props.swiper.isUnselected()
                    ? styles.selectPartyActionDisabled
                    : null
                ]}
              >
                <Txt white medium style={styles.selectPartyActionText}>
                  {t('swiperSelectParties.uncheckAll')}
                </Txt>
              </TouchableOpacity>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.partiesList,
              {
                opacity: opacityList,
                transform: [{ translateY: translateList }]
              }
            ]}
          >
            {this.props.swiper.election.parties.map(party => {
              delay = delay + 75;

              return (
                <View style={styles.party} key={party.slug}>
                  <FadeIn delay={delay}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.swiper.toggleParty(party.slug);
                      }}
                      style={styles.partyShadow}
                    >
                      <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        colors={["#D9DAEB", "#ffffff"]}
                        style={[
                          styles.partyBg,
                          this.isActive(party.slug)
                            ? styles.partySelected
                            : null
                        ]}
                      >
                        <Image
                          source={{ uri: cdn(party.logo) }}
                          style={styles.partyLogo}
                          resizeMode="contain"
                        />
                      </LinearGradient>
                    </TouchableOpacity>
                  </FadeIn>
                </View>
              );
            })}
          </Animated.View>
        </ScrollView>

        <Animated.View
          style={[
            styles.progress,
            { transform: [{ translateY: translateAction }] }
          ]}
        >
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={["rgba(0, 0, 0, 1)", "transparent"]}
            style={styles.progressBg}
          >
            <ButtonGradient
              onPress={this.goToResult}
              text={
                !this.hasEnoughParties()
                  ? t('swiperSelectParties.chooseMinOne')
                  : t('swiperSelectParties.nextButton')
              }
              disabled={!this.hasEnoughParties()}
            />
          </LinearGradient>
        </Animated.View>
      </View>
    );
  }
}

export default inject("swiper", "app")(observer(SelectParties));
