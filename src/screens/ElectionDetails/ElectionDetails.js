import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { View } from "react-native";
import {
  Container,
  ScrollContainer,
  ShareButton,
  Loader,
  BoxGradient,
  Countdown,
  Title,
  Txt,
  Box
} from "components";
import styles from "./styles";
import { moment, Query, t } from "util";
import { headerHeight } from "../../common";
// mport PartnerInfo from './PartnerInfo';

// eslint-disable-next-line
class ElectionDetails extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired,
    swiper: PropTypes.object.isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerRight: <ShareButton message="Probiere den WahlSwiper aus: " url={`https://www.wahlswiper.de/wahlen/${navigation.state.params.election.slug}`} title="Finde deine Partei" />
  });

  render() {
    return (
      <Container>
        <Query query="GET_QUESTIONS" variables={{ election: this.props.navigation.state.params.election.id }}>
          {({ loading, error, data, refetch, networkStatus }) => {
            if (loading) return <Loader fullscreen />;
            if (error) {
              return <View />;
            }

            const election = this.props.navigation.state.params.election;

            return (
              <ScrollContainer withPadding contentInset={{ top: 0 }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingTop: headerHeight() + 10, paddingBottom: headerHeight() + 10 }}>
                <BoxGradient>
                  {moment().isAfter(moment(election.voting_day)) ? (
                    <View>
                      <Title uppercase center h5>
                        {t('electionDetails.countdownPast')}
                      </Title>
                      <Title h1 center bold style={styles.electionDate}>
                        {moment(election.voting_day).format("LL")}
                      </Title>
                    </View>
                  ) : (
                    <View>
                      <Title h5 uppercase center>
                        {t('electionDetails.countdown')}
                      </Title>
                      <Countdown date={`${election.voting_day} 00:00:00`} />
                    </View>
                  )}
                </BoxGradient>

                <Box
                  actionText={t('electionDetails.startButtonText')}
                  actionOnPress={() => {
                    this.props.swiper.setElection({
                      ...election,
                      questions: data.questions,
                    });
                    this.props.navigation.navigate("ModalSwiper");
                  }}
                  withBorder
                >
                  <Title mainBig center textCenter style={{ color: '#392F52' }}>
                    {election.name}
                  </Title>
                  <Txt copy center style={{ color: '#392F52' }}>{t('electionDetails.infoText')}</Txt>
                </Box>
              </ScrollContainer>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default inject('app', 'swiper')(observer(ElectionDetails));
