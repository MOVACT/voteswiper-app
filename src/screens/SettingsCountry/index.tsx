import {useNavigation} from '@react-navigation/native';
import BoxGradient from 'components/BoxGradient';
import Container from 'components/Container';
import CountryPill from 'components/CountryPill';
import Loader from 'components/Loader';
import ScrollContainer from 'components/ScrollContainer';
import Title from 'components/Title';
import Txt from 'components/Txt';
import {ENDPOINTS, useFetch} from 'connectors/api';
import {useApp} from 'contexts/app';
import React from 'react';
import {RefreshControl, View} from 'react-native';
import OneSignal from 'react-native-onesignal';
import {Country} from 'types/api';
import styles from './styles';

const SettingsCountry: React.FC = () => {
  const {setCountry, t} = useApp();
  const {reset} = useNavigation();

  const {loading, error, data, refetch} = useFetch<Country[]>(
    ENDPOINTS.COUNTRIES,
  );

  if (loading) {
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
            {t('settingsCountry.boxTitle')}
          </Title>
          <Txt copy center>
            {t('settingsCountry.boxText')}
          </Txt>
        </BoxGradient>
        <View style={styles.countriesList}>
          {data.map((country) => {
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
