import React from "react";
import { View, TouchableOpacity, StyleSheet, RefreshControl } from "react-native";
import { inject, observer } from "mobx-react/native";
import Matomo from "react-native-matomo";
import RNRestart from 'react-native-restart';
import { Container, Txt, Loader, ScrollContainer, BoxGradient, Title, ElectionPill } from "components";
import stores from "stores";
import { getCountryFlag, t, Query, locale } from "util";
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
  },
  noElectionsBox: {
    paddingTop: 30,
    paddingLeft: 25,
    paddingRight: 25,
  },
  info: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    marginBottom: 15,
  },
  infoActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 15,
  },
  infoAction: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  infoMainAction: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
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

  componentDidMount() {
    Matomo.trackScreen('/elections', 'ElectionsIndex');
  }

  render() {
    const languageNotice = this.props.app.languageNotice;
    const shouldShow = languageNotice.shouldShow;
    return (
      <Container>
        <Query query="GET_ELECTIONS" variables={{country: this.props.app.country.id}}>
          {({ loading, error, data, refetch, networkStatus }) => {
            if (loading && networkStatus !== 4) return <Loader fullscreen />;
            if (error) {
              return <View />;
            }

            console.log('render2');

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
                {locale() === "en" && shouldShow === true ?
                  <View style={styles.info}>
                    <Title h1 center>Do you speak german?</Title>
                    <Txt copy center>If so, then we advise you to switch the app language to german to get the questionairre in the original language it was created.</Txt>
                    
                    <View style={styles.infoActions}>
                      <TouchableOpacity onPress={() => {
                        this.props.app.setLanguage(this.props.app.country.language_code);
                        RNRestart.Restart();
                      }} style={styles.infoMainAction}><Txt copy center medium style={{ color: '#392F52' }}>Switch to german</Txt></TouchableOpacity>
                      <TouchableOpacity onPress={() => { this.props.app.dismissLanguageNotice(); }} style={styles.infoAction}><Txt copy center medium>Dismiss</Txt></TouchableOpacity>
                    </View>
                  </View>
                 : null}
                <BoxGradient>
                  <Title mainBig center>{t('electionsIndex.boxTitle')}</Title>
                  {t('electionsIndex.boxText') !== "" ?
                    <Txt copy center>{t('electionsIndex.boxText')}</Txt> : null}
                </BoxGradient>
                
                {data.elections.length > 0 ?
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
                :
                <View style={styles.noElectionsBox}>
                  <Txt copy center>{t('electionsIndex.noElections')}</Txt>
                </View>
                }
                
                
                {data.pastElections.length > 0 ?
                  <View style={{ paddingTop: 60, paddingBottom: 100 }}>
                    <BoxGradient>
                      <Title mainBig center>{t('electionsIndex.boxPastTitle')}</Title>
                      {t('electionsIndex.boxPastText') !== "" ?
                        <Txt copy center>{t('electionsIndex.boxText')}</Txt> : null}
                    </BoxGradient>

                    <View style={styles.electionsList}>
                      {data.pastElections.map(election => {
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
                  </View>
                  : null}
              </ScrollContainer>
            )
          }}
        </Query>
      </Container>
    );
  }
}

export default inject('app')(observer(ElectionsIndex));