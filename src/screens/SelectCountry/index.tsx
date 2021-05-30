import BoxGradient from 'components/BoxGradient';
import Container from 'components/Container';
import CountryPill from 'components/CountryPill';
import Loader from 'components/Loader';
import scrollContainerStyles from 'components/ScrollContainer/styles';
import Title from 'components/Title';
import Txt from 'components/Txt';
import {ENDPOINTS, useFetch} from 'connectors/api';
import {useApp} from 'contexts/app';
import React from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import OneSignal from 'react-native-onesignal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Country} from 'types/api';
import styles from './styles';

const SelectCountry: React.FC = () => {
  const {setCountry, t} = useApp();
  const {loading, error, data, refetch} = useFetch<Country[]>(
    ENDPOINTS.COUNTRIES,
  );
  const {top, bottom} = useSafeAreaInsets();

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
      <ScrollView
        contentContainerStyle={[
          scrollContainerStyles.withPadding,
          {paddingTop: top + 20, paddingBottom: bottom + 20},
        ]}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            colors={['#ffffff']}
            enabled
            tintColor={'#ffffff'}
          />
        }>
        <BoxGradient>
          <Title mainBig center>
            {t('selectCountry.title')}
          </Title>
          <Txt copy center>
            {t('selectCountry.introText')}
          </Txt>
        </BoxGradient>
        <View style={styles.countriesList}>
          {data.map((country: Country) => {
            return (
              <CountryPill
                onPress={() => {
                  OneSignal.sendTags({
                    country_id: country.id,
                    country_slug: country.slug,
                  });
                  setCountry(country);
                }}
                key={country.id}
                locale={country.country_code}
                name={country.name}
              />
            );
          })}
        </View>
      </ScrollView>
    </Container>
  );
};

export default SelectCountry;
