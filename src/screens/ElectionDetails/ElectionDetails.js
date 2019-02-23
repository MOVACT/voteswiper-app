import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import moment from "moment";
import { View } from "react-native";
import {
  Container,
  ScrollContainer,
  ShareButton,
  FullLoader,
  BoxGradient,
  Countdown,
  Title,
  Box
} from "components";
import styles from "./styles";
import PartnerInfo from './PartnerInfo';

// eslint-disable-next-line
class ElectionDetails extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerRight: <ShareButton message="Probiere den WahlSwiper aus: " url={`https://www.wahlswiper.de/wahlen/${navigation.state.params.slug}`} title="Finde deine Partei" />
  });
  // eslint-disable-next-line
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.loading === false && nextProps.data.election) {
      this.props.swiper.setElection(nextProps.data.election);
    }
  }

  render() {
    if (this.props.data.loading) {
      return (
        <Container>
          <FullLoader />
        </Container>
      );
    }

    const { election } = this.props.swiper;

    return (
      <Container>
        <ScrollContainer withPadding>
          <BoxGradient>
            {moment().isAfter(moment(election.date)) ? (
              <View>
                <Title uppercase center h5>
                  Die Wahl fand statt am
                </Title>
                <Title h1 center bold style={styles.electionDate}>
                  {moment(election.date).format("LL")}
                </Title>
              </View>
            ) : (
              <View>
                <Title h5 uppercase center>
                  Countdown zur Wahl
                </Title>
                <Countdown date={`${election.date} 08:00:00`} />
              </View>
            )}
          </BoxGradient>

          <Box
            actionText="Jetzt starten"
            actionOnPress={() => {
              this.props.navigation.navigate("ModalSwiper");
            }}
            withBorder
          >
            <Title mainBig center textCenter>
              Beantworte die Fragen durch einfaches Wischen der Karten.
            </Title>
          </Box>

          {/* <Title h1 center>
            Informationen zur Wahl
          </Title>

          <ButtonDark text="Der Landtag" onPress={() => {}} />
          <ButtonDark text="Parteien" onPress={() => {}} /> */}
        </ScrollContainer>
      </Container>
    );
  }
}

export default inject('app')(observer(ElectionDetails));
