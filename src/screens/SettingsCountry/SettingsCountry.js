import React from "react";
import { View, RefreshControl } from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';
import { inject, observer } from "mobx-react/native";
import OneSignal from "react-native-onesignal";
import { Container, ScrollContainer, Txt, BoxGradient } from "components";
import { Title, CountryPill, Loader } from "components";
import { t, Query } from "util";
import styles from "./styles";
import { headerHeight } from "common";

class SettingsCountry extends React.Component {
  static navigationOptions = {
    headerTitle: t('settingsCountry.title'),
  }
  render() {
    return (
      <Container>
        <Query
          query="GET_COUNTRIES"
        >
          {({ loading, error, data, refetch, networkStatus }) => {
            if (loading && networkStatus !== 4) return <Loader />;
            if (error) {
              return <View />;
            }
            return (
              <ScrollContainer
                withPadding
                refreshControl={
                  <RefreshControl
                    refreshing={loading && networkStatus === 4}
                    onRefresh={() => {
                      refetch();
                    }}
                    colors={["#ffffff"]}
                    enabled
                    tintColor={"#ffffff"}
                  />
                }
              >
                <BoxGradient>
                  <Title mainBig center>{t('settingsCountry.boxTitle')}</Title>
                  <Txt copy center>{t('settingsCountry.boxText')}</Txt>
                </BoxGradient>
                <View style={styles.countriesList}>
                  {data.countries.map(country => {
                    return (
                      <CountryPill
                        onPress={() => {
                          OneSignal.sendTags({
                            country_id: country.id,
                            country_slug: country.slug
                          });
                          this.props.app.setCountry(country);
                          const resetAction = StackActions.reset({
                            index: 0,
                            actions: [
                              NavigationActions.navigate({ routeName: 'Index' }),
                            ],
                          });
                          this.props.navigation.dispatch(resetAction);
                        }}
                        key={country.id}
                        locale={country.country_code}
                        name={country.name}
                      />
                    );
                  })}
                </View>
                <View style={{ height: 90 }} />
              </ScrollContainer>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default inject('app')(observer(SettingsCountry));
