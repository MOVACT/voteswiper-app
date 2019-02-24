import React from "react";
import PropTypes from "prop-types";
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
import { ButtonDark, ResultBar, Loader, Title, Txt } from "components";
import styles from "./styles";
import Download from "../../icons/Download";

const iPhone6 = 375;
const { width } = Dimensions.get("window");

class Result extends React.Component {
  static propTypes = {
    swiper: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    parties: PropTypes.array.isRequired,
    closeResult: PropTypes.func.isRequired,
    election: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.isFirst = true;
    this.partyScore = [];
    this.delay = 0;

    this.props.parties.map(party => {
      this.partyScore.push({ name: party.slug, score: 0 });
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

          const partyAnswer = party.answers.find(
            a => a.questionId === question.id
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
    fetch("https://api.wahlswiper.de/v1/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        election: this.props.swiper.election.slug,
        relevantQuestionsCount: relevantQuestionsCount,
        answers: answers,
        result: result,
        device: Platform.OS
      })
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
                source={{ uri: party.logo }}
                style={styles.topMatchLogoImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.topMatchContent}>
              <Title h5dark style={styles.topMatchSubTitle}>
                DEIN TOP MATCH
              </Title>
              <Txt medium style={styles.topMatchTitle}>
                {party.fullName}
              </Txt>

              <TouchableOpacity
                onPress={() => {
                  /* firebase.analytics().logEvent("requested_wahlprogramm", {
                    party: party.name
                  }); */
                  Linking.openURL(party.url);
                }}
                style={styles.programLink}
              >
                <Download />
                <Txt medium style={styles.programLinkText}>
                  Wahlprogramm
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
          title: "#WahlSwiper Ergebnis",
          message: `Mein #WahlSwiper Ergebnis zur ${this.props.election.name}`,
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
          <ButtonDark onPress={this.share} arrow={false} text="Teilen" icon="share" />
          <View style={styles.resultToolbarButton}>
            <ButtonDark onPress={this.props.closeResult} arrow={false} text={width < iPhone6 ? "Parteien" : "Parteien filtern"} icon="edit" center />
          </View>
        </View>

        <View style={styles.resultList}>
          {ordered.map(result => {
            return this.renderBar(result);
          })}

          {this.props.election.slug === 'landtagswahl-hessen-2018' ?
            <View style={{ borderRadius: 5, padding: 15, marginTop: 15, backgroundColor: '#fff' }}>
              <Txt style={{ fontSize: 14, lineHeight: 20 }}>
                Unsere Partner von der <Txt medium>Universität Freiburg</Txt> bitten um eine freiwillige Umfrage zum Wahlswiper-Ergebnis.
                </Txt>

              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://ww2.unipark.de/uc/UniFreiburg_Hessen-LTW-2018/");
                }}
              >
                <Txt style={{ fontSize: 14, lineHeight: 20, marginTop: 5, color: '#000' }} bold>Teilnahme an Umfrage &raquo;</Txt>
              </TouchableOpacity>
            </View> : null}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
      <View style={styles.screenshotArea} ref={screenshotArea => (this.screenshotArea = screenshotArea)}>
        <Title h1>
          WahlSwiper-Ergebnis zur {this.props.election.name}
        </Title>
        {ordered.map(result => {
          return this.renderBar(result, true);
        })}
      </View>
    </View>;
  }
}

export default inject("swiper")(observer(Result));
