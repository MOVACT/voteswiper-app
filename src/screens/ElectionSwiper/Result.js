import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { captureRef } from "react-native-view-shot";
import LinearGradient from "react-native-linear-gradient";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import Share from 'react-native-share';
import {
  ScrollView,
  View,
  Dimensions,
  Platform,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import { config } from "common";
import { ButtonDark, ResultBar, Loader, Title, Txt } from "components";
import styles from "./styles";
import Download from "../../icons/Download";
import { cdn, t } from "util";

const iPhone6 = 375;
const { width } = Dimensions.get("window");

class Result extends React.Component {
  static propTypes = {
    swiper: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    parties: PropTypes.object.isRequired,
    closeResult: PropTypes.func.isRequired,
    election: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.isFirst = true;
    this.partyScore = [];
    this.delay = 0;

    this.props.parties.map(party => {
      this.partyScore.push({ name: party.slug, id: party.id, score: 0 });
      return null;
    });

    this.relevantQuestionsCount = 0;

    this.state = {
      loading: true,
      screenshotLoading: false,
      screenshot: null
    };
  }

  componentDidMount() {
    this.props.swiper.election.questions.map(question => {
      const userAnswer = this.getAnswer(question.id);
      const pointsToAdd = userAnswer.doubleWeight === true ? 2 : 1;

      if (userAnswer.answer !== 0) {
        this.relevantQuestionsCount = this.relevantQuestionsCount + pointsToAdd;

        this.props.parties.map(party => {
          let addToScore = 0;

          const partyAnswer = party.pivot.answers.find(
            a => a.question_id === question.id
          ).answer;
          // console.log(partyAnswer, party.slug);
          // If party has not given answer, zero points
          if (partyAnswer !== 0) {
            // if same answer, count 1 up
            addToScore = userAnswer.answer === partyAnswer ? pointsToAdd : 0;
          }

          const index = this.partyScore.findIndex(i => i.name === party.slug);
          this.partyScore[index].score =
            this.partyScore[index].score + addToScore;
          return null;
        });
      }

      return true;
    });

    const ordered = this.partyScore.slice(0);
    ordered.sort((a, b) => (a.score - b.score > 0 ? -1 : 1));

    this.trackResult(
      toJS(this.props.swiper.answers[this.props.swiper.election.slug]),
      ordered,
      this.relevantQuestionsCount
    );

    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1000);
  }

  trackResult = (answers, result, relevantQuestionsCount) => {
    axios.post(config.apiUrl, {
      query: `mutation Result($election_id: Int!, $result: String!, $top_party_id: Int!, $platform: String!) {
        result(election_id: $election_id, result: $result, top_party_id: $top_party_id, platform: $platform) {
          success
        }
      }`,
      variables: {
        election_id: this.props.swiper.election.id,
        result: JSON.stringify(answers),
        top_party_id: result[0].id,
        platform: Platform.OS,
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  getAnswer = id => {
    if (
      this.props.swiper.answers[this.props.swiper.election.slug][id] == null
    ) {
      return { doubleWeight: false, answer: 0 };
    }

    return this.props.swiper.answers[this.props.swiper.election.slug][id];
  };

  renderTopMatch = party => {
    if (this.isFirst === true) {
      this.isFirst = false;
      return (
        <View style={styles.topMatchContainer}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["#FFFFFF", "#D9DAEB"]}
            style={[styles.topMatch]}
          >
            <View style={styles.topMatchLogo}>
              <Image
                source={{ uri: cdn(party.logo) }}
                style={styles.topMatchLogoImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.topMatchContent}>
              <Title h5dark style={styles.topMatchSubTitle}>
                {t('swiperResult.topmatch').toUpperCase()}
              </Title>
              <Txt medium style={styles.topMatchTitle}>
                {party.full_name}
              </Txt>

              <TouchableOpacity
                onPress={() => {
                  /* firebase.analytics().logEvent("requested_wahlprogramm", {
                    party: party.name
                  }); */
                  Linking.openURL(party.pivot.program);
                }}
                style={styles.programLink}
              >
                <Download />
                <Txt medium style={styles.programLinkText}>
                  {t('swiperResult.program')}
                </Txt>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      );
    }
  };

  renderBar = (result, shareBar) => {
    if (
      this.props.swiper.parties[this.props.swiper.election.slug].indexOf(
        result.name
      ) === -1
    ) {
      return null;
    }

    let percentage = (result.score * 100) / this.relevantQuestionsCount;

    // if no question selected
    if (this.relevantQuestionsCount === 0) {
      percentage = 0;
    }

    this.delay = this.delay + 200;

    const party = this.props.parties.find(p => p.slug === result.name);

    return (
      <View key={party.slug}>
        <ResultBar
          key={party.slug}
          shareBar={shareBar}
          onPress={() => {
            this.props.navigation.navigate("ModalCompareParty", {
              party,
              election: this.props.swiper.election,
              getAnswer: this.getAnswer
            });
          }}
          name={party.name}
          percentage={percentage}
          delay={this.delay}
        />
        {this.renderTopMatch(party)}
      </View>
    );
  };

  share = () => {
    this.setState({ screenshotLoading: true }, () => {
      captureRef(this.screenshotArea, {
        format: "png",
        result: "data-uri"
      }).then(result => {
        this.setState({ screenshotLoading: false });
        Share.open({
          title: t('swiperResult.shareTitle'),
          message: t('swiperResult.shareMessage', this.props.election.name),
          type: "image/png",
          url: result
        });
      });
    });
  };

  render() {
    if (this.state.loading) {
      return <Loader fullscreen />;
    }

    this.isFirst = true;

    // (this.partyScore);

    const ordered = this.partyScore.slice(0);
    ordered.sort((a, b) => (a.score - b.score > 0 ? -1 : 1));

    return <View style={styles.container}>
      <ScrollView>
        <View style={styles.resultToolbar}>
          <ButtonDark onPress={this.share} arrow={false} text={t('swiperResult.share')} icon="share" />
          <View style={styles.resultToolbarButton}>
            <ButtonDark onPress={this.props.closeResult} arrow={false} text={width < iPhone6 ? t('swiperResult.parties') : t('swiperResult.filterParties')} icon="edit" center />
          </View>
        </View>

        <View style={styles.resultList}>
          {ordered.map(result => {
            return this.renderBar(result);
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
      <View style={styles.screenshotArea} ref={screenshotArea => (this.screenshotArea = screenshotArea)}>
        <Title h1>
          {t('swiperResult.screenshotTitle', this.props.election.name)}
        </Title>
        {ordered.map(result => {
          return this.renderBar(result, true);
        })}
      </View>
    </View>;
  }
}

export default inject("swiper")(observer(Result));
