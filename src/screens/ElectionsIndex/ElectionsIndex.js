import React from "react";
import { View, TouchableOpacity, StyleSheet, RefreshControl } from "react-native";
import { inject, observer } from "mobx-react/native";
import { Container, Txt, Loader, ScrollContainer, BoxGradient, Title, ElectionPill } from "components";
import stores from "stores";
import { getCountryFlag, t, Query } from "util";
import ChevronRight from "../../icons/ChevronRight";

const styles = StyleSheet.create({
  countryLink: {
    marginLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryFlag: {
    paddingRight: 10,
  },
  countryLinkText: {
    fontSize: 14,
    color: '#fff',
    marginRight: 5
  },
  electionsList: {
    paddingTop: 10,
  }
});

class ElectionsIndex extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SettingsCountry');
          }}
          style={styles.countryLink}
        >
          <View style={styles.countryFlag}>
            {getCountryFlag(stores.app.country.country_code, { width: 28, height: 20 })}
          </View>
          <Txt style={styles.countryLinkText} medium>{stores.app.country.name}</Txt>
          <ChevronRight />
        </TouchableOpacity>
      ),
    };
  }
  render() {
    return (
      <Container>
        <Query query="GET_ELECTIONS" variables={{country: this.props.app.country.id}}>
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
                  <Title mainBig center>{t('electionsIndex.boxTitle')}</Title>
                  {t('electionsIndex.boxText') !== "" ?
                    <Txt copy center>{t('electionsIndex.boxText')}</Txt> : null}
                </BoxGradient>

                <View style={styles.electionsList}>
                  {data.elections.map(election => {
                    return (
                      <ElectionPill
                        key={election.id}
                        {...election}
                        onPress={() => {
                          this.props.navigation.navigate("Details", {
                            title: election.name,
                            election: election
                          });
                        }}
                      />
                    )
                  })}
                </View>
              </ScrollContainer>
            )
          }}
        </Query>
      </Container>
    );
  }
}

export default inject('app')(observer(ElectionsIndex));