import React from 'react';
import {View, RefreshControl} from 'react-native';
import OneSignal from 'react-native-onesignal';
import Txt from 'components/Txt';
import BoxGradient from 'components/BoxGradient';
import Container from 'components/Container';
import ScrollContainer from 'components/ScrollContainer';
import Title from 'components/Title';
import CountryPill from 'components/CountryPill';
import Loader from 'components/Loader';
import {useQuery} from 'util/api';
import styles from './styles';
import {useApp} from 'contexts/app';
import {Country} from 'types/api';

const SelectCountry: React.FC = () => {
  const {setCountry, t} = useApp();
  const {loading, error, data, refetch} = useQuery('GET_COUNTRIES');

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
            refreshing={data.loading && data.networkStatus === 4 ? true : false}
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
          {data.countries.map((country: Country) => {
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
      </ScrollContainer>
    </Container>
  );
};

export default SelectCountry;
