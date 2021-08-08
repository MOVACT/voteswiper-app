import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/stack';
import Container from 'components/Container';
import Loader from 'components/Loader';
import ResultBar, {roundNumber} from 'components/ResultBar';
import Title from 'components/Title';
import Txt from 'components/Txt';
import {ENDPOINTS, fetch as apiFetch} from 'connectors/api';
import {useApp} from 'contexts/app';
import {useSwiper} from 'contexts/swiper';
import AdjustmentHorizontal from 'icons/AdjustmentHorizontal';
import BoxMultiple from 'icons/BoxMultiple';
import Close from 'icons/Close';
import Download from 'icons/Download';
import Polaroid from 'icons/Polaroid';
import React from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Image,
  Linking,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import ExitConfirmDialog from 'screens/Swiper/components/ExitConfirmDialog';
import {Party, ResultData} from 'types/api';
import swiperStyles from '../Swiper/styles';
import styles from './styles';

const {width} = Dimensions.get('window');

const SwiperResult: React.FC = () => {
  const headerHeight = useHeaderHeight();
  const {t, language} = useApp();
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
  const [loadingScreenshot, setLoadingScreenshot] = React.useState(false);
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
      apiFetch<ResultData>(ENDPOINTS.SAVE_RESULT, language!, {
        data: {
          election_id: election!.id,
          result: JSON.stringify(answers[election!.id]),
          top_party_id: result[0].id,
          platform: Platform.OS,
        },
      });
    },
    [election, answers, language],
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
    });

    const ordered = partyScore.current.slice(0);
    ordered.sort((a, b) => (a.score - b.score > 0 ? -1 : 1));
    trackResult(ordered);

    setLoading(false);
  }, [election, getAnswer, trackResult]);

  const renderTopMatch = React.useCallback(
    (party: Party) => {
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
                  source={{uri: party.logo.public_link}}
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

                {party.pivot.program_link && (
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(party.pivot.program_link as string);
                    }}
                    style={styles.programLink}>
                    <Download />
                    <Txt medium style={styles.programLinkText}>
                      {t('swiperResult.program')}
                    </Txt>
                  </TouchableOpacity>
                )}
              </View>
            </LinearGradient>
          </View>
        );
      }
    },
    [t],
  );

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

  const ordered = partyScore.current.slice(0);
  ordered.sort((a, b) => (a.score - b.score > 0 ? -1 : 1));

  const shareResult = React.useCallback(() => {
    setLoadingScreenshot(true);
    const queryString =
      ordered
        .map((party) => {
          let percentage = (party.score * 100) / relevantQuestionsCount.current;

          if (relevantQuestionsCount.current === 0) {
            percentage = 0;
          }

          const partyDetails = election!.parties.find((p) => p.id === party.id);

          if (!partyDetails) {
            return null;
          }

          return (
            'score[]=' +
            encodeURIComponent(
              `${partyDetails.name},${roundNumber(percentage, 1)}`,
            )
          );
        })
        .join('&') +
      '&election=' +
      encodeURIComponent(election!.name);
    const url = `https://share.voteswiper.org/api/share-image?${queryString}`;

    fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        // eslint-disable-next-line no-undef
        var reader = new FileReader();

        reader.readAsDataURL(blob);

        reader.onloadend = () => {
          var base64data = reader.result;

          setLoadingScreenshot(false);

          Share.open({
            title: t('swiperResult.shareTitle'),
            message: t('swiperResult.shareMessage', [election!.name]),
            type: 'image/png',
            url: base64data,
          });
        };
      });
  }, [election, ordered, t]);

  if (loading) {
    return (
      <Container>
        <Loader fullscreen />
      </Container>
    );
  }

  const actions = [
    {
      action: () => {
        openEditAnswers();
        navigate('EditAnswers');
      },
      icon: AdjustmentHorizontal,
      label: 'swiperResult.editAnswers',
    },
    {
      action: () => {
        goBack();
      },
      icon: BoxMultiple,
      label: 'swiperResult.filterParties',
    },
    {
      action: () => {
        shareResult();
      },
      icon: Polaroid,
      label: 'swiperResult.share',
    },
  ];

  return (
    <Container>
      <View style={[swiperStyles.content, {marginTop: headerHeight}]}>
        <ScrollView contentContainerStyle={styles.container}>
          <ScrollView
            nestedScrollEnabled
            horizontal
            style={styles.actionList}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.actionListContainer}
            snapToInterval={(width - 25 * 2) / 2 - 10}>
            {actions.map((action) => {
              const Icon = action.icon;
              if (
                action.label === 'swiperResult.share' &&
                loadingScreenshot === true
              ) {
                return (
                  <View style={styles.actionItem} key={action.label}>
                    <View style={styles.actionButton}>
                      <ActivityIndicator
                        color="#fff"
                        style={styles.actionIcon}
                      />
                      <Txt medium style={styles.actionText}>
                        {t('swiperResult.share.loading')}
                      </Txt>
                    </View>
                  </View>
                );
              }
              return (
                <View style={styles.actionItem} key={action.label}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={action.action}>
                    <Icon stroke="#fff" style={styles.actionIcon} />
                    <Txt medium style={styles.actionText}>
                      {t(action.label)}
                    </Txt>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.results}>
            {ordered.map((result) => {
              return renderBar(result);
            })}
          </View>
        </ScrollView>
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
