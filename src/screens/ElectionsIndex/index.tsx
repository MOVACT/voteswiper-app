import React from 'react';
import {View, TouchableOpacity, RefreshControl} from 'react-native';
import Matomo from 'react-native-matomo';
import RNRestart from 'react-native-restart';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Loader from 'components/Loader';
import Container from 'components/Container';
import Txt from 'components/Txt';
import ScrollContainer from 'components/ScrollContainer';
import BoxGradient from 'components/BoxGradient';
import Title from 'components/Title';
import ElectionPill from 'components/ElectionPill';
import getCountryFlag from 'util/getCountryFlag';
import {useQuery} from 'util/api';
import locale from 'util/locale';
import ChevronRight from '../../icons/ChevronRight';
import styles from './styles';

import {useApp} from 'contexts/app';
import {Election} from 'types/api';

const ElectionsIndex: React.FC = () => {
  const {navigate, setOptions} = useNavigation();
  const {
    languageNotice,
    language,
    country,
    setLocale,
    dismissLanguageNotice,
    t,
  } = useApp();
  const {loading, error, data, refetch, networkStatus} = useQuery(
    'GET_ELECTIONS',
    {
      variables: {
        country: country!.id,
      },
    },
  );

  React.useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigate('SettingsCountry');
          }}
          style={styles.countryLink}>
          <View style={styles.countryFlag}>
            {getCountryFlag(country!.country_code, {
              width: 28,
              height: 20,
            })}
          </View>
          <Txt style={styles.countryLinkText} medium>
            {country!.name}
          </Txt>
          <ChevronRight />
        </TouchableOpacity>
      ),
      title: '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  const trackScreen = React.useCallback(() => {
    Matomo.trackScreen('/elections', 'ElectionsIndex');
  }, []);

  useFocusEffect(trackScreen);

  if (loading && networkStatus !== 4) {
    return (
      <Container>
        <Loader fullscreen />
      </Container>
    );
  }

  if (error) {
    return <View />;
  }

  return (
    <Container>
      <ScrollContainer
        withPadding
        refreshControl={
          <RefreshControl
            refreshing={loading && networkStatus === 4}
            onRefresh={() => {
              refetch();
            }}
            colors={['#ffffff']}
            enabled
            tintColor={'#ffffff'}
          />
        }>
        {locale(language) === 'en' && languageNotice.shouldShow === true ? (
          <View style={styles.info}>
            <Title h1 center>
              Do you speak {t('countryLanguage')}?
            </Title>
            <Txt copy center>
              If so, then we advise you to switch the app language to german to
              get the questionnaire in the original language it was created.
            </Txt>

            <View style={styles.infoActions}>
              <TouchableOpacity
                onPress={() => {
                  setLocale(country!.language_code);
                  setTimeout(() => {
                    RNRestart.Restart();
                  }, 500);
                }}
                style={styles.infoMainAction}>
                <Txt copy center medium style={styles.switchText}>
                  Switch to german
                </Txt>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dismissLanguageNotice();
                }}
                style={styles.infoAction}>
                <Txt copy center medium>
                  Dismiss
                </Txt>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        <BoxGradient>
          <Title mainBig center>
            {t('electionsIndex.boxTitle')}
          </Title>
          {t('electionsIndex.boxText') !== '' ? (
            <Txt copy center>
              {t('electionsIndex.boxText')}
            </Txt>
          ) : null}
        </BoxGradient>

        {data.elections.length > 0 ? (
          <View style={styles.electionsList}>
            {data.elections.map((election: Election) => {
              return (
                <ElectionPill
                  key={election.id}
                  {...election}
                  onPress={() => {
                    navigate('Details', {
                      title: election.name,
                      election,
                      country,
                    });
                  }}
                />
              );
            })}
          </View>
        ) : (
          <View style={styles.noElectionsBox}>
            <Txt copy center>
              {t('electionsIndex.noElections')}
            </Txt>
          </View>
        )}

        {data.pastElections.length > 0 ? (
          <View style={styles.pastElectionsContainer}>
            <BoxGradient>
              <Title mainBig center>
                {t('electionsIndex.boxPastTitle')}
              </Title>
              {t('electionsIndex.boxPastText') !== '' ? (
                <Txt copy center>
                  {t('electionsIndex.boxText')}
                </Txt>
              ) : null}
            </BoxGradient>

            <View style={styles.electionsList}>
              {data.pastElections.map((election) => {
                return (
                  <ElectionPill
                    key={election.id}
                    {...election}
                    onPress={() => {
                      navigate('Details', {
                        title: election.name,
                        election,
                        country,
                      });
                    }}
                  />
                );
              })}
            </View>
          </View>
        ) : null}
      </ScrollContainer>
    </Container>
  );
};

export default ElectionsIndex;
