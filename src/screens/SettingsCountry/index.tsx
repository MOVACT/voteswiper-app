import React from 'react';
import {View, RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';
import Container from 'components/Container';
import ScrollContainer from 'components/ScrollContainer';
import Txt from 'components/Txt';
import BoxGradient from 'components/BoxGradient';
import Title from 'components/Title';
import CountryPill from 'components/CountryPill';
import Loader from 'components/Loader';
import styles from './styles';
import {useApp} from 'contexts/app';
import {useQuery} from 'util/api';

const SettingsCountry: React.FC = () => {
  const {setCountry, t} = useApp();
  const {reset} = useNavigation();

  const {loading, error, data, refetch, networkStatus} = useQuery(
    'GET_COUNTRIES',
  );

  if (loading && networkStatus !== 4) {
    return (
      <Container>
        <Loader />
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
        <BoxGradient>
          <Title mainBig center>
            {t('settingsCountry.boxTitle')}
          </Title>
          <Txt copy center>
            {t('settingsCountry.boxText')}
          </Txt>
        </BoxGradient>
        <View style={styles.countriesList}>
          {data.countries.map((country) => {
            return (
              <CountryPill
                onPress={() => {
                  OneSignal.sendTags({
                    country_id: country.id,
                    country_slug: country.slug,
                  });
                  setCountry(country);
                  reset({
                    index: 0,
                    routes: [{name: 'Index'}],
                  });
                }}
                key={country.id}
                locale={country.country_code}
                name={country.name}
              />
            );
          })}
        </View>
        <View style={styles.offset} />
      </ScrollContainer>
    </Container>
  );
};

export default SettingsCountry;
