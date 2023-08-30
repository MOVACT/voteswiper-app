import {useFocusEffect, useNavigation} from '@react-navigation/native';
import BoxGradient from 'components/BoxGradient';
import Container from 'components/Container';
import ElectionPill from 'components/ElectionPill';
import Loader from 'components/Loader';
import ScrollContainer from 'components/ScrollContainer';
import Title from 'components/Title';
import Txt from 'components/Txt';
import {ENDPOINTS, useFetch} from 'connectors/api';
import {useApp} from 'contexts/app';
import React from 'react';
import {RefreshControl, TouchableOpacity, View} from 'react-native';
import {useMatomo} from 'matomo-tracker-react-native';
import {Election, ElectionsData} from 'types/api';
import getCountryFlag from 'util/getCountryFlag';
import moment from 'util/momentLocale';
import ChevronRight from '../../icons/ChevronRight';
import rtl from '../../rtl';
import styles from './styles';

const ElectionsIndex: React.FC = () => {
  const {navigate, setOptions} = useNavigation();
  const {country, t} = useApp();
  const {trackScreenView} = useMatomo();

  const {loading, error, data, refetch} = useFetch<Election[], ElectionsData>(
    ENDPOINTS.ELECTIONS,
    {data: {country: country!.id, include: 'all'}},
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
          <ChevronRight style={rtl.mirror} />
        </TouchableOpacity>
      ),
      title: '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  const trackScreen = React.useCallback(() => {
    trackScreenView('/elections' + ' / ElectionsIndex');
  }, [trackScreenView]);

  useFocusEffect(trackScreen);

  const upcomingElections = React.useMemo(() => {
    if (!data) {
      return [];
    }
    return data.filter((election) =>
      moment().isSameOrBefore(election.voting_day, 'day'),
    );
  }, [data]);

  const pastElections = React.useMemo(() => {
    if (!data) {
      return [];
    }
    return data.filter((election) => moment().isAfter(election.voting_day));
  }, [data]);

  if (loading) {
    return (
      <Container>
        <Loader fullscreen />
      </Container>
    );
  }

  if (error) {
    return <Container />;
  }

  return (
    <Container>
      <ScrollContainer
        withPadding
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              refetch();
            }}
            colors={['#ffffff']}
            enabled
            tintColor={'#ffffff'}
          />
        }>
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

        {upcomingElections.length > 0 ? (
          <View style={styles.electionsList}>
            {upcomingElections.map((election: Election) => {
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

        {pastElections.length > 0 ? (
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
              {pastElections.map((election) => {
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
