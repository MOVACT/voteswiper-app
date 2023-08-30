import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Box from 'components/Box';
import BoxGradient from 'components/BoxGradient';
import Container from 'components/Container';
import Countdown from 'components/Countdown';
import Loader from 'components/Loader';
import ScrollContainer from 'components/ScrollContainer';
import ShareButton from 'components/ShareButton';
import Title from 'components/Title';
import Txt from 'components/Txt';
import {ENDPOINTS, fetch, useFetch} from 'connectors/api';
import {useApp} from 'contexts/app';
import {useSwiper} from 'contexts/swiper';
import React from 'react';
import {Platform, View} from 'react-native';
import {useMatomo} from 'matomo-tracker-react-native';
import {
  Election,
  InitiateData,
  PartiesData,
  Party,
  Question,
  QuestionsData,
} from 'types/api';
import {ElectionStackParamList} from 'types/routes';
import locale from 'util/locale';
import moment from 'util/momentLocale';
import styles from './styles';

type ElectionDetailsScreenRouteProp = RouteProp<
  ElectionStackParamList,
  'Details'
>;

const ElectionDetails: React.FC = () => {
  const {trackScreenView} = useMatomo();
  const {setOptions, navigate} = useNavigation();
  const {language, t} = useApp();
  const {setElection} = useSwiper();
  const {params} = useRoute<ElectionDetailsScreenRouteProp>();

  moment.locale(language || 'de');

  const {loading, error, data} = useFetch<Question[], QuestionsData>(
    ENDPOINTS.QUESTIONS,
    {data: {id: params.election.id}},
  );

  const {
    loading: loadingParties,
    error: errorParties,
    data: parties,
  } = useFetch<Party[], PartiesData>(ENDPOINTS.PARTIES, {
    data: {id: params.election.id},
  });

  React.useEffect(() => {
    setOptions({
      title: params.title,
      headerRight: () => (
        <ShareButton
          message="#VoteSwiper #WahlSwiper"
          url={`https://www.voteswiper.org/${locale(language)}/${
            params.country.slug
          }/${params.election.slug}`}
          title="#VoteSwiper"
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.country, params.election, params.title]);

  const trackScreen = React.useCallback(() => {
    trackScreenView(params.election.slug + ' / ' + 'ElectionDetails');
  }, [params.election, trackScreenView]);

  useFocusEffect(trackScreen);

  const trackInitiation = React.useCallback(
    (election: Election) => {
      fetch<InitiateData>(ENDPOINTS.COUNT_INITIATE, language!, {
        data: {
          election_id: election!.id,
          platform: Platform.OS,
        },
      });
    },
    [language],
  );

  if (loading || loadingParties) {
    return (
      <Container>
        <Loader fullscreen />
      </Container>
    );
  }
  if (error || errorParties) {
    return <Container />;
  }

  const {election} = params;

  return (
    <Container>
      <ScrollContainer
        withPadding
        contentInset={{top: 0}}
        contentContainerStyle={styles.container}>
        <BoxGradient>
          {moment().isAfter(moment(election.voting_day)) ? (
            <View>
              <Title uppercase center h5>
                {t('electionDetails.countdownPast')}
              </Title>
              <Title h1 center style={styles.electionDate}>
                {moment(election.voting_day).format('LL')}
              </Title>
            </View>
          ) : (
            <View>
              <Title h5 uppercase center>
                {t('electionDetails.countdown')}
              </Title>
              <Countdown date={`${election.voting_day} 00:00:00`} />
            </View>
          )}
        </BoxGradient>

        <Box
          actionText={t('electionDetails.startButtonText')}
          actionOnPress={() => {
            trackInitiation(election);
            setElection({
              ...election,
              questions: data,
              parties,
            });
            navigate('Swiper');
          }}
          withBorder>
          <Title mainBig center textCenter style={styles.textColor}>
            {election.name}
          </Title>
          <Txt copy center style={styles.textColor}>
            {t('electionDetails.infoText')}
          </Txt>
        </Box>
      </ScrollContainer>
    </Container>
  );
};

export default ElectionDetails;
