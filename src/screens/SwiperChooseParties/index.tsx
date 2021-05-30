import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/stack';
import ButtonGradient from 'components/ButtonGradient';
import Container from 'components/Container';
import FadeIn from 'components/FadeIn';
import Txt from 'components/Txt';
import {useApp} from 'contexts/app';
import {useSwiper} from 'contexts/swiper';
import Close from 'icons/Close';
import React from 'react';
import {
  BackHandler,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {Easing} from 'react-native-reanimated';
import ExitConfirmDialog from 'screens/Swiper/components/ExitConfirmDialog';
import NavigationButton from 'screens/Swiper/components/NavigationButton';
import swiperStyles from '../Swiper/styles';
import styles from './styles';

const SwiperChooseParties: React.FC = () => {
  const {t} = useApp();
  const delay = React.useRef(200);
  const {navigate, goBack, setOptions, dangerouslyGetParent} = useNavigation();
  const animation = React.useRef(new Animated.Value(0));
  const headerHeight = useHeaderHeight();
  const [exitConfirmation, showExitConfirmation] = React.useState(false);

  const {
    toggleParty,
    clearAnswers,
    isPartyActive,
    selectAllParties,
    unselectAllParties,
    isUnselected,
    election,
    parties,
  } = useSwiper();

  React.useEffect(() => {
    Animated.timing(animation.current, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.quad),
    }).start();
  }, []);

  React.useEffect(() => {
    setOptions({
      headerLeft: () => {
        return (
          <View style={swiperStyles.headerLeft}>
            <View style={swiperStyles.headerNavigation}>
              <NavigationButton
                onPress={() => {
                  goBack();
                }}
                type="previous"
              />
            </View>
            <View style={swiperStyles.headerTitle}>
              <Txt medium style={swiperStyles.headerTitleText}>
                {t('swiperResult.chooseParties')}
              </Txt>
            </View>
          </View>
        );
      },
      /**
       * Will show a close button with confirmation dialog
       */
      headerRight: () => {
        return (
          <View style={swiperStyles.headerClose}>
            <TouchableOpacity
              style={swiperStyles.headerCloseAction}
              onPress={() => {
                showExitConfirmation(true);
              }}>
              <Close />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [setOptions, goBack, t]);

  const handleBackButton = React.useCallback(() => {
    showExitConfirmation(true);
    return true;
  }, []);

  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  });

  const opacity = animation.current.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 1, 0],
  });

  const hasEnoughParties = React.useMemo(() => {
    if (!parties[election!.id]) {
      return false;
    }

    if (parties[election!.id].length === 0) {
      return false;
    }

    return true;
  }, [election, parties]);

  return (
    <Container>
      <View style={styles.container}>
        <View style={[styles.content, {marginTop: headerHeight}]}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Txt style={styles.text}>{t('swiperSelectParties.text')}</Txt>

            <View style={styles.actions}>
              <TouchableOpacity
                disabled={
                  typeof parties[election!.id] !== 'undefined' &&
                  parties[election!.id].length >= election!.parties.length
                }
                onPress={() => {
                  selectAllParties(election!.parties);
                }}
                style={[
                  styles.action,
                  typeof parties[election!.id] !== 'undefined' &&
                  parties[election!.id].length >= election!.parties.length
                    ? styles.actionDisabled
                    : {},
                ]}>
                <Txt medium center style={styles.actionText}>
                  {t('swiperSelectParties.checkAll')}
                </Txt>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={isUnselected()}
                onPress={() => {
                  unselectAllParties();
                }}
                style={[
                  styles.action,
                  isUnselected() ? styles.actionDisabled : {},
                ]}>
                <Txt medium center style={styles.actionText}>
                  {t('swiperSelectParties.uncheckAll')}
                </Txt>
              </TouchableOpacity>
            </View>

            <Animated.View style={[styles.list, {opacity}]}>
              {election!.parties.map((party) => {
                delay.current = delay.current + 75;

                return (
                  <View style={styles.party} key={party.slug}>
                    <FadeIn delay={delay.current}>
                      <TouchableOpacity
                        onPress={() => {
                          toggleParty(party.id);
                        }}
                        style={styles.partyShadow}>
                        <LinearGradient
                          start={{x: 0, y: 1}}
                          end={{x: 0, y: 0}}
                          colors={['#D9DAEB', '#ffffff']}
                          style={[
                            styles.partyBg,
                            isPartyActive(party) ? styles.partySelected : null,
                          ]}>
                          <Image
                            source={{uri: party.logo.public_link}}
                            style={styles.partyLogo}
                          />
                          <Txt medium center style={styles.partyName}>
                            {party.name}
                          </Txt>
                        </LinearGradient>
                      </TouchableOpacity>
                    </FadeIn>
                  </View>
                );
              })}
            </Animated.View>
          </ScrollView>

          <View style={styles.progress}>
            <LinearGradient
              start={{x: 0, y: 0.5}}
              end={{x: 0, y: 0}}
              colors={['rgba(0, 0, 0, 0.95)', 'transparent']}
              style={styles.progressBg}>
              <ButtonGradient
                onPress={() => {
                  navigate('Result');
                }}
                text={
                  !hasEnoughParties
                    ? t('swiperSelectParties.chooseMinOne')
                    : t('swiperSelectParties.nextButton')
                }
                disabled={!hasEnoughParties}
              />
            </LinearGradient>
          </View>
        </View>
      </View>

      {exitConfirmation && (
        <ExitConfirmDialog
          onCancel={() => {
            showExitConfirmation(false);
          }}
          onConfirm={() => {
            clearAnswers();
            dangerouslyGetParent()?.goBack();
          }}
        />
      )}
    </Container>
  );
};

export default SwiperChooseParties;
