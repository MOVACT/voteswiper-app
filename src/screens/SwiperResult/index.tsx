import axios from 'axios';
import {useSwiper} from 'contexts/swiper';
import {useHeaderHeight} from '@react-navigation/stack';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Share from 'react-native-share';
import React from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  View,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import config from 'common/config';
import Container from 'components/Container';
import Loader from 'components/Loader';
import swiperStyles from '../Swiper/styles';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './styles';
import t from 'util/t';
import ButtonDark from 'components/ButtonDark';
import {sm} from 'common/breakpoints';
import ResultBar from 'components/ResultBar';
import {Party} from 'types/api';
import LinearGradient from 'react-native-linear-gradient';
import cdn from 'util/cdn';
import Title from 'components/Title';
import Txt from 'components/Txt';
import Close from 'icons/Close';
import Download from 'icons/Download';
import {captureRef} from 'react-native-view-shot';
import ExitConfirmDialog from 'screens/Swiper/components/ExitConfirmDialog';

const {width} = Dimensions.get('window');

const SwiperResult: React.FC = () => {
  const screenshotArea = React.useRef<View>(null);
  const headerHeight = useHeaderHeight();
  const {goBack, navigate, dangerouslyGetParent, setOptions} = useNavigation();
  const {
    election,
    parties,
    answers,
    clearAnswers,
    openEditAnswers,
  } = useSwiper();
  const isFirst = React.useRef(true);
  const partyScore = React.useRef(
    election!.parties.map((party) => ({
      name: party.slug,
      id: party.id,
      score: 0,
    })),
  );
  const delay = React.useRef(0);
  const relevantQuestionsCount = React.useRef(0);

  const [loading, setLoading] = React.useState(true);
  const [screenshotLoading, setScreenshotLoading] = React.useState(false);
  const [exitConfirmation, showExitConfirmation] = React.useState(false);

  React.useEffect(() => {
    setOptions({
      headerLeft: () => {
        return (
          <View style={swiperStyles.headerLeft}>
            <View style={swiperStyles.headerTitle}>
              <Txt medium style={swiperStyles.headerTitleText}>
                {t('swiperResult.yourResult')}
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
  }, [setOptions, goBack]);

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

  const getAnswer = React.useCallback(
    (id: number) => {
      if (answers[election!.id][id] == null) {
        return {doubleWeight: false, answer: 0};
      }

      return answers[election!.id][id];
    },
    [answers, election],
  );

  const trackResult = React.useCallback(
    (result) => {
      axios.post(
        config.apiUrl,
        {
          query: `mutation Result($election_id: Int!, $result: String!, $top_party_id: Int!, $platform: String!) {
        result(election_id: $election_id, result: $result, top_party_id: $top_party_id, platform: $platform) {
          success
        }
      }`,
          variables: {
            election_id: election!.id,
            result: JSON.stringify(answers[election!.id]),
            top_party_id: result[0].id,
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
    [election, answers],
  );

  React.useEffect(() => {
    election?.questions.map((question) => {
      const userAnswer = getAnswer(question.id);
      /**
       * If user double weighted his answer, it will count twice
       */
      const pointsToAdd = userAnswer.doubleWeight === true ? 2 : 1;

      /**
       * A skipped answer won't count
       */
      if (userAnswer.answer !== 0) {
        relevantQuestionsCount.current =
          relevantQuestionsCount.current + pointsToAdd;

        election.parties.map((party) => {
          let addToScore = 0;

          const partyAnswer =
            party.pivot.answers.find((a) => a.question_id === question.id)
              ?.answer ?? 0;

          if (partyAnswer !== 0) {
            // if answer matches user answer, count up
            addToScore = userAnswer.answer === partyAnswer ? pointsToAdd : 0;
          }

          const index = partyScore.current.findIndex((i) => i.id === party.id);
          partyScore.current[index].score =
            partyScore.current[index].score + addToScore;
          return null;
        });
      }

      const ordered = partyScore.current.slice(0);
      ordered.sort((a, b) => (a.score - b.score > 0 ? -1 : 1));
      trackResult(ordered);

      setLoading(false);
    });
  }, [election, getAnswer, trackResult]);

  const renderTopMatch = React.useCallback((party: Party) => {
    if (isFirst.current === true) {
      isFirst.current = false;

      return (
        <View style={styles.topMatchContainer}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={['#FFFFFF', '#D9DAEB']}
            style={[styles.topMatch]}>
            <View style={styles.topMatchLogo}>
              <Image
                source={{uri: cdn(party.logo)}}
                style={styles.topMatchLogoImage}
              />
            </View>
            <View style={styles.topMatchContent}>
              <Title h5dark style={styles.topMatchSubTitle}>
                {t('swiperResult.topmatch').toUpperCase()}
              </Title>
              <Txt medium style={styles.topMatchTitle}>
                {party.full_name}
              </Txt>

              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(party.pivot.program);
                }}
                style={styles.programLink}>
                <Download />
                <Txt medium style={styles.programLinkText}>
                  {t('swiperResult.program')}
                </Txt>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      );
    }
  }, []);

  const renderBar = React.useCallback(
    (
      result: {id: number; name: string; score: number},
      shareBar: boolean = false,
    ) => {
      if (parties[election!.id].indexOf(result.id) === -1) {
        return null;
      }

      let percentage = (result.score * 100) / relevantQuestionsCount.current;

      if (relevantQuestionsCount.current === 0) {
        percentage = 0;
      }

      delay.current = delay.current + 200;

      const party = election!.parties.find((p) => p.id === result.id);

      if (!party) {
        return null;
      }

      return (
        <View key={party.slug}>
          <ResultBar
            shareBar={shareBar}
            onPress={() => {
              navigate('CompareParty', {
                party,
              });
            }}
            name={party.name}
            percentage={percentage}
            delay={delay.current}
          />
          {renderTopMatch(party)}
        </View>
      );
    },
    [election, parties, renderTopMatch, navigate],
  );

  const shareResult = React.useCallback(() => {
    setScreenshotLoading(true);
    captureRef(screenshotArea, {
      format: 'png',
      result: 'data-uri',
    }).then((result) => {
      setScreenshotLoading(false);
      Share.open({
        title: t('swiperResult.shareTitle'),
        message: t('swiperResult.shareMessage', election!.name),
        type: 'image/png',
        url: result,
      });
    });
  }, [election]);

  if (loading) {
    return (
      <Container>
        <Loader fullscreen />
      </Container>
    );
  }

  const ordered = partyScore.current.slice(0);
  ordered.sort((a, b) => (a.score - b.score > 0 ? -1 : 1));

  return (
    <Container>
      <View style={[swiperStyles.content, {marginTop: headerHeight}]}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.actions}>
            <View style={styles.action}>
              <ButtonDark
                onPress={() => shareResult()}
                text={
                  screenshotLoading ? (
                    <View style={styles.shareLoader}>
                      <ActivityIndicator
                        size="small"
                        style={styles.shareLoaderIcon}
                        color="#fff"
                      />
                    </View>
                  ) : (
                    t('swiperResult.share')
                  )
                }
                icon="share"
                center
              />
            </View>
            <View style={styles.action}>
              <ButtonDark
                onPress={() => {
                  goBack();
                }}
                text={
                  width < sm
                    ? t('swiperResult.parties')
                    : t('swiperResult.filterParties')
                }
                icon="edit"
                center
              />
            </View>
          </View>

          <ButtonDark
            onPress={() => {
              openEditAnswers();
              navigate('EditAnswers');
            }}
            text={t('swiperResult.editAnswers')}
            icon="share"
            center
          />

          <View style={styles.results}>
            {ordered.map((result) => {
              return renderBar(result);
            })}
          </View>
        </ScrollView>
      </View>

      <View style={styles.screenshotArea} ref={screenshotArea}>
        <Title h1>{t('swiperResult.screenshotTitle', election!.name)}</Title>
        {ordered.map((result) => {
          return renderBar(result, true);
        })}
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

export default SwiperResult;
