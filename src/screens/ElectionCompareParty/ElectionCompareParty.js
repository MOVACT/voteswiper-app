import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Animated,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking
} from "react-native";
import { Container, Txt, Title, Box, ButtonDark } from "components";
import styles from "../ElectionSwiper/styles";
import compareStyles from "./styles";
import Close from "../../icons/Close";
import { cdn, t } from "util";

class ElectionCompareParty extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => ({
    title: `Vergleich mit ${navigation.state.params.party.name}`
  });

  constructor(props) {
    super(props);

    this.state = {
      showReason: null
    };
  }

  getPartyAnswer = question => {
    const party = this.props.navigation.state.params.party;

    return party.pivot.answers.find(a => a.question_id === question);
  };

  render() {
    const { party, election, getAnswer } = this.props.navigation.state.params;

    return (
      <Container noPadding>
        <View style={styles.header}>
          <Animated.View style={[styles.headerAbsolute]}>
            <View style={styles.headerTitle}>
              <Txt medium style={styles.headerTitleText}>
                {t('swiperResult.comparisonWith', party.name)}
              </Txt>
            </View>
          </Animated.View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.dispatch({ type: "Navigation/BACK" });
              }}
              style={styles.headerButton}
            >
              <Close />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.swiper}>
            <View style={styles.container}>
              <ScrollView>
                <View style={compareStyles.partyDetail}>
                  <View style={compareStyles.partyDetailLogoContainer}>
                    <Image
                      source={{ uri: cdn(party.logo) }}
                      style={compareStyles.partyDetailLogo}
                      resizeMode="contain"
                    />
                  </View>

                  <Txt medium style={compareStyles.partyDetailTitle}>
                    {party.full_name}
                  </Txt>

                  {typeof party.pivot.url !== 'undefined' ? 
                  <View style={compareStyles.partyDetailButton}>
                    <ButtonDark
                      text="Webseite"
                      onPress={() => {
                        Linking.openURL(party.pivot.url);
                      }}
                    />
                  </View> : null}
                  {typeof party.pivot.program !== 'undefined' ?
                  <View style={compareStyles.partyDetailButton}>
                    <ButtonDark
                      text={t('swiperResult.program')}
                      onPress={() => {
                        Linking.openURL(party.pivot.program);
                      }}
                    />
                  </View>
                  : null}
                </View>
                <View style={compareStyles.questions}>
                  {election.questions.map(question => {
                    const userAnswer = getAnswer(question.id);
                    const partyAnswer = this.getPartyAnswer(question.id);

                    return (
                      <Box key={question.id}>
                        {userAnswer.doubleWeight === true ?
                          <View style={{ justifyContent: 'flex-start' }}>
                            <View style={{ backgroundColor: '#E6E90F', paddingVertical: 5, paddingHorizontal: 10, marginBottom: 5, borderRadius: 3 }}>
                              <Txt medium style={{  color: '#000',  lineHeight: 16,  textAlign: 'center' }}>{t('swiper.doubleWeighted')}</Txt>
                            </View>
                          </View>
                          : null}
                        <Title mainBig style={compareStyles.thesis}>
                          {question.question}
                        </Title>

                        {partyAnswer.reason ? (
                          <TouchableOpacity
                            onPress={() => {
                              if (this.state.showReason === question.id) {
                                this.setState({ showReason: null });

                                return null;
                              }

                              this.setState({ showReason: question.id });
                            }}
                          >
                            <Txt style={compareStyles.reasonLink} medium>
                              {this.state.showReason === question.id
                                ? t('swiperResult.closeReasoning')
                                : t('swiperResult.readReasoning')}
                            </Txt>
                          </TouchableOpacity>
                        ) : (
                          <Txt medium style={compareStyles.reasonLink}>{t('swiperResult.noReason')}</Txt>
                        )}

                        {partyAnswer.reason &&
                        this.state.showReason === question.id ? (
                          <View style={compareStyles.reason}>
                            <Txt style={compareStyles.reasonText}>
                              {partyAnswer.reason}
                            </Txt>
                          </View>
                        ) : null}

                        <View style={compareStyles.answers}>
                          <View style={compareStyles.answer}>
                            <Title h5dark uppercase>{t('swiperResult.yourAnswer')}</Title>
                            {userAnswer.answer == 0 ? (
                              <View style={compareStyles.noneLabel}>
                                <Txt medium style={compareStyles.labelText}>
                                  {t('swiper.none')}
                                </Txt>
                              </View>
                            ) : null}
                            {userAnswer.answer === 1 ? (
                              <View style={compareStyles.noLabel}>
                                <Txt medium style={compareStyles.labelText}>
                                  {t('swiper.no')}
                                </Txt>
                              </View>
                            ) : null}
                            {userAnswer.answer === 2 ? (
                              <View style={compareStyles.yesLabel}>
                                <Txt medium style={compareStyles.labelText}>
                                {t('swiper.yes')}
                                </Txt>
                              </View>
                            ) : null}
                          </View>
                          <View style={compareStyles.answer}>
                            <Title h5dark uppercase>{t('swiperResult.party')}</Title>
                            {partyAnswer.answer === 0 ? (
                              <View style={compareStyles.noneLabel}>
                                <Txt medium style={compareStyles.labelText}>
                                {t('swiper.none')}
                                </Txt>
                              </View>
                            ) : null}
                            {partyAnswer.answer === 1 ? (
                              <View style={compareStyles.noLabel}>
                                <Txt medium style={compareStyles.labelText}>
                                {t('swiper.no')}
                                </Txt>
                              </View>
                            ) : null}
                            {partyAnswer.answer === 2 ? (
                              <View style={compareStyles.yesLabel}>
                                <Txt medium style={compareStyles.labelText}>
                                {t('swiper.yes')}
                                </Txt>
                              </View>
                            ) : null}
                          </View>
                        </View>
                      </Box>
                    );
                  })}
                </View>
                <View style={{ height: 100 }} />
              </ScrollView>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

export default ElectionCompareParty;
