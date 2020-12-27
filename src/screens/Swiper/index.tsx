import {useHeaderHeight} from '@react-navigation/stack';
import {
  useNavigation,
  useFocusEffect,
  StackActions,
} from '@react-navigation/native';
import DeckSwiper from 'react-native-deck-swiper';
import Container from 'components/Container';
import axios from 'axios';
import React from 'react';
import {View, Platform, BackHandler} from 'react-native';
import styles, {containerPaddingHorizontal, controlsPaddingTop} from './styles';
import Card from './components/Card';
import {useSwiper} from 'contexts/swiper';
import Loader from 'components/Loader';
import MainButton from './components/MainButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {buttonSize} from './components/MainButton/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Skip from 'icons/Skip';
import Close from 'icons/Close';
import Txt from 'components/Txt';
import t from 'util/t';
import config from 'common/config';
import {Question} from 'types/api';
import NavigationButton from './components/NavigationButton';
import ExitConfirmDialog from './components/ExitConfirmDialog';

const Swiper: React.FC = () => {
  const $swiper = React.useRef<DeckSwiper<Question>>(null);
  const headerHeight = useHeaderHeight();
  const {bottom} = useSafeAreaInsets();
  const {setOptions, dispatch, navigate} = useNavigation();
  const {election, clearAnswers, setAnswer} = useSwiper();
  const [cardIndex, setCardIndex] = React.useState(0);
  const [exitConfirmation, showExitConfirmation] = React.useState(false);

  const trackAnswer = React.useCallback(
    (question: number, answer: number) => {
      axios.post(
        config.apiUrl,
        {
          query: `mutation Swipe($election_id: Int!, $question_id: Int!, $answer: Int!, $platform: String!) {
            swipe(election_id: $election_id, question_id: $question_id, answer: $answer, platform: $platform) {
              success
            }
          }`,
          variables: {
            election_id: election!.id,
            question_id: question,
            answer: answer,
            platform: Platform.OS,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    },
    [election],
  );

  React.useEffect(() => {
    setOptions({
      /**
       * Will show previous and next buttons in the header
       */
      headerLeft: () => {
        return (
          <View style={styles.headerLeft}>
            <View style={styles.headerNavigation}>
              <NavigationButton
                onPress={() => {
                  $swiper.current?.jumpToCardIndex(cardIndex - 1);
                  setCardIndex(cardIndex - 1);
                }}
                disabled={cardIndex < 1}
                type="previous"
              />
              <NavigationButton
                onPress={() => {
                  $swiper.current?.jumpToCardIndex(cardIndex + 1);
                  setCardIndex(cardIndex + 1);
                }}
                disabled={cardIndex + 1 > election!.questions.length}
                type="next"
              />
            </View>
            <View style={styles.headerTitle}>
              <Txt medium style={styles.headerTitleText}>
                {t(
                  'swiper.questionNumber',
                  cardIndex + 1 > election!.questions.length
                    ? election!.questions.length
                    : cardIndex + 1,
                  election!.questions.length,
                )}
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
          <View style={styles.headerClose}>
            <TouchableOpacity
              style={styles.headerCloseAction}
              onPress={() => {
                showExitConfirmation(true);
              }}>
              <Close />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [setOptions, clearAnswers, dispatch, cardIndex, election]);

  const handleBackButton = React.useCallback(() => {
    showExitConfirmation(true);
    return true;
  }, []);

  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    /**
     * Go to last card if one comes back after he finished
     */
    if (cardIndex === election!.questions.length) {
      $swiper.current?.jumpToCardIndex(cardIndex - 1);
      setCardIndex(cardIndex - 1);
    }

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  });

  const getQuestionID = React.useCallback(
    (index: number) => {
      return election!.questions[index].id;
    },
    [election],
  );

  const swipedNo = React.useCallback(
    (index: number) => {
      const id = getQuestionID(index);
      setAnswer(id, 1);
      trackAnswer(id, 1);
    },
    [setAnswer, trackAnswer, getQuestionID],
  );

  const swipedYes = React.useCallback(
    (index: number) => {
      const id = getQuestionID(index);
      setAnswer(id, 2);
      trackAnswer(id, 2);
    },
    [setAnswer, trackAnswer, getQuestionID],
  );

  const swipedSkip = React.useCallback(
    (index: number) => {
      const id = getQuestionID(index);
      setAnswer(id, 0);
      trackAnswer(id, 0);
    },
    [setAnswer, trackAnswer, getQuestionID],
  );

  if (!election) {
    return (
      <Container>
        <Loader fullscreen />
      </Container>
    );
  }

  return (
    <Container noPadding>
      <View style={styles.root}>
        <View style={{...styles.content, marginTop: headerHeight}}>
          <View style={styles.swiper}>
            <DeckSwiper
              ref={$swiper}
              cards={election.questions}
              keyExtractor={(cardData) => cardData.id.toString()}
              renderCard={(card) => {
                return <Card {...card} />;
              }}
              onSwipedAll={() => {
                navigate('ChooseParties');
              }}
              onSwiped={(index) => {
                setCardIndex(index + 1);
              }}
              onSwipedLeft={swipedNo}
              onSwipedRight={swipedYes}
              onSwipedTop={swipedSkip}
              cardIndex={cardIndex}
              showSecondCard
              stackSize={3}
              stackSeparation={20}
              backgroundColor="transparent"
              cardHorizontalMargin={containerPaddingHorizontal}
              cardTopMargin={containerPaddingHorizontal}
              cardBottomMargin={buttonSize + bottom + controlsPaddingTop}
              marginBottom={headerHeight}
              disableBottomSwipe
              animateOverlayLabelsOpacity
              overlayLabels={{
                left: {
                  element: (
                    <View style={styles.noOverlay}>
                      <Txt medium style={styles.overlayText}>
                        {t('swiper.no')}
                      </Txt>
                    </View>
                  ),
                  style: {
                    wrapper: styles.noOverlayWrapper,
                  },
                },
                right: {
                  element: (
                    <View style={styles.yesOverlay}>
                      <Txt medium style={styles.overlayText}>
                        {t('swiper.yes')}
                      </Txt>
                    </View>
                  ),
                  style: {
                    wrapper: styles.yesOverlayWrapper,
                  },
                },
                top: {
                  element: (
                    <View style={styles.skipOverlay}>
                      <Txt medium style={styles.overlayText}>
                        {t('swiper.skip')}
                      </Txt>
                    </View>
                  ),
                  style: {
                    wrapper: styles.skipOverlayWrapper,
                  },
                },
              }}
            />
          </View>

          <View
            style={[
              styles.controls,
              {
                height: buttonSize + bottom + controlsPaddingTop,
                paddingBottom: bottom,
              },
            ]}>
            <MainButton
              type="no"
              onPress={() => {
                if ($swiper.current) {
                  $swiper.current.swipeLeft();
                }
              }}
            />
            <TouchableOpacity
              onPress={() => {
                if ($swiper.current) {
                  $swiper.current.swipeTop();
                }
              }}
              style={styles.skip}>
              <Skip width={20} height={20} />
              <Txt style={styles.skipText}>{t('swiper.skip')}</Txt>
            </TouchableOpacity>
            <MainButton
              type="yes"
              onPress={() => {
                if ($swiper.current) {
                  $swiper.current.swipeRight();
                }
              }}
            />
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
            dispatch(StackActions.pop(1));
          }}
        />
      )}
    </Container>
  );
};

export default Swiper;
