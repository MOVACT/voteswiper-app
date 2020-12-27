import React from 'react';
import {View, Platform} from 'react-native';
import Matomo from 'react-native-matomo';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import axios from 'axios';
import Container from 'components/Container';
import ScrollContainer from 'components/ScrollContainer';
import ShareButton from 'components/ShareButton';
import Loader from 'components/Loader';
import BoxGradient from 'components/BoxGradient';
import Countdown from 'components/Countdown';
import Title from 'components/Title';
import Txt from 'components/Txt';
import Box from 'components/Box';
import styles from './styles';
import moment from 'util/momentLocale';
import {useQuery} from 'util/api';
import t from 'util/t';
import locale from 'util/locale';
import config from 'common/config';
import {ElectionStackParamList} from 'types/routes';
import {useSwiper} from 'contexts/swiper';
import {useApp} from 'contexts/app';

type ElectionDetailsScreenRouteProp = RouteProp<
  ElectionStackParamList,
  'Details'
>;

const ElectionDetails: React.FC = () => {
  const {setOptions, navigate} = useNavigation();
  const {language} = useApp();
  const {setElection} = useSwiper();
  const {params} = useRoute<ElectionDetailsScreenRouteProp>();
  const {loading, error, data} = useQuery('GET_QUESTIONS', {
    variables: {election: params.election.id},
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
    Matomo.trackScreen(params.election.slug, 'ElectionDetails');
  }, [params.election]);

  useFocusEffect(trackScreen);

  const trackInitiation = React.useCallback((election) => {
    axios.post(
      config.apiUrl,
      {
        query: `mutation Initiate($election_id: Int!, $platform: String!) {
        initiate(election_id: $election_id, platform: $platform) {
          success
        }
      }`,
        variables: {
          election_id: election,
          platform: Platform.OS,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }, []);

  if (loading) {
    return (
      <Container>
        <Loader fullscreen />
      </Container>
    );
  }
  if (error) {
    return <View />;
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
            trackInitiation(election.id);
            setElection({
              ...election,
              questions: data.questions,
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
