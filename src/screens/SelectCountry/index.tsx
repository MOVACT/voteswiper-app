import React from 'react';
import {View, RefreshControl} from 'react-native';
import OneSignal from 'react-native-onesignal';
import {Txt, BoxGradient} from 'components';
import Container from 'components/Container';
import ScrollContainer from 'components/ScrollContainer';
import {Title, CountryPill, Loader} from 'components';
import t from 'util/t';
import Query from 'util/api';
import styles from './styles';
import {useApp} from 'contexts/app';

const SelectCountry: React.FC = () => {
  const {setCountry} = useApp();
  return (
    <Container>
      <Query query="GET_COUNTRIES">
        {({loading, error, data, refetch}) => {
          if (loading) {
            return <Loader />;
          }
          if (error) {
            return <View />;
          }

          return (
            <ScrollContainer
              withPadding
              refreshControl={
                <RefreshControl
                  refreshing={data.loading && data.networkStatus === 4}
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
                {data.countries.map((country) => {
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
          );
        }}
      </Query>
    </Container>
  );
};

export default SelectCountry;
