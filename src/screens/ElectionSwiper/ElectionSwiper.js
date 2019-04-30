import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import {
  View,
  Animated,
  Easing,
  TouchableOpacity,
  Platform,
  ScrollView
} from "react-native";
import axios from "axios";
import { config } from "common";
import LinearGradient from "react-native-linear-gradient";
import { Container, Swiper, Txt, FullScreenVideo, Title, BoxGradient, ButtonGradient } from "components";
import NoButton from "./partials/NoButton";
import YesButton from "./partials/YesButton";
import Card from "./partials/Card";
import PrevButton from "./partials/PrevButton";
import NextButton from "./partials/NextButton";
import styles from "./styles";
import SelectParties from "./SelectParties";
import Close from "../../icons/Close";
import { t } from "util";
import Skip from '../../icons/Skip';
import Check from '../../icons/Check';

class ElectionSwiper extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    swiper: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired
  };

  static navigationOptions = {
    gesturesEnabled: false,
    swipeEnabled: false
  };

  constructor(props) {
    super(props);

    this.state = {
      video: false,
      videoLegacy: false,
      currentIndex: 0,
      isSwipingBack: false,
      noMoreCards: false,

      finishAnimation: new Animated.Value(0)
    };
  }

  componentDidMount() {
    // firebase.analytics().setCurrentScreen("ElectionSwiper", "ElectionSwiper");
  }

  trackAnswer = (answer, question) => {
    axios.post(config.apiUrl, {
      query: `mutation Swipe($election_id: Int!, $question_id: Int!, $answer: Int!, $platform: String!) {
        swipe(election_id: $election_id, question_id: $question_id, answer: $answer, platform: $platform) {
          success
        }
      }`,
      variables: {
        election_id: this.props.swiper.election.id,
        question_id: question,
        answer: answer,
        platform: Platform.OS,
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  nopeView = pan => {
    let opacity = pan.x.interpolate({
      inputRange: [-90, -(90 / 2)],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });
    let animatedStyles = { opacity: opacity };

    return (
      <Animated.View
        style={[styles.nopeOverlay, animatedStyles]}
        pointerEvents="none"
      />
    );
  };

  yupView = pan => {
    let opacity = pan.x.interpolate({
      inputRange: [90 / 2, 90],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });
    let animatedStyles = { opacity: opacity };

    return (
      <Animated.View
        style={[styles.yupOverlay, animatedStyles]}
        pointerEvents="none"
      />
    );
  };

  setIsSwipingBack = (isSwipingBack, cb) => {
    this.setState(
      {
        isSwipingBack
      },
      cb
    );
  };

  getQuestionID = index => {
    return this.props.swiper.election.questions[index].id;
  };

  swipePrev = () => {
    // this.props.swiperStore.goBack();
    // this.countDown();
    this.trackAnswer(0, this.getQuestionID(this.state.currentIndex));
    if (!this.state.isSwipingBack) {
      this.setIsSwipingBack(true, () => {
        this.swiper._goToPrevCard(() => {
          this.updateIndex(this.state.currentIndex - 1, {
            isSwipingBack: false
          });
        });
      });
    }
  };

  swipeNext = () => {
    // this.props.swiperStore.goBack();
    // this.countDown();
    const id = this.getQuestionID(this.state.currentIndex);
    this.trackAnswer(0, id);
    this.props.swiper.setAnswer(id, 0);
    if (!this.state.isSwipingBack) {
      this.setIsSwipingBack(true, () => {
        this.swiper._goToNextCard(() => {
          this.updateIndex(this.state.currentIndex + 1, {
            isSwipingBack: false
          });
        });
      });
    }
  };

  onDragLeft = card => {
    this.props.swiper.setAnswer(card.id, 1);
    this.trackAnswer(1, card.id);
    this.updateIndex(this.state.currentIndex + 1, {});
  };

  onDragRight = card => {
    this.props.swiper.setAnswer(card.id, 2);
    this.trackAnswer(2, card.id);
    this.updateIndex(this.state.currentIndex + 1, {});
  };

  /**
   * When the user is selecting a party and hits the
   * back button we need to update the index and reverse
   * the animation
   */
  goToLastCard = () => {
    this.setState({
      noMoreCards: false,
    }, () => {
      this.setIsSwipingBack(true, () => {
        this.swiper._goToPrevCard(() => {
          Animated.timing(
            this.state.finishAnimation, // The value to drive
            {
              toValue: 0,
              useNativeDriver: true,
              easing: Easing.ease
            }
          ).start(() => {
            this.setState({
              isSwipingBack: false,
              currentIndex: this.state.currentIndex - 1
            });
          });
        });
      });
    });
  };

  goToParties = () => {
    Animated.timing(
      this.state.finishAnimation, // The value to drive
      {
        toValue: 1,
        useNativeDriver: true,
        easing: Easing.ease
      }
    ).start();
  };

  /**
   * This method updates the card Index, but also checks
   * if the new index is bigger or equal to the number
   * of  available cards and then triggers the animation
   * to hidek ui elements that are not needed for the party
   * selector
   **/
  updateIndex = (newIndex, otherValues) => {
    if (newIndex >= this.props.swiper.election.questions.length) {
      // If it was the last card, animate
      Animated.timing(
        this.state.finishAnimation, // The value to drive
        {
          toValue: 1,
          useNativeDriver: true,
          easing: Easing.ease
        }
      ).start(() => {
        this.setState({
          ...otherValues,
          currentIndex: newIndex
        });
      }); // Start the animation

      return;
    }

    this.setState({
      ...otherValues,
      currentIndex: newIndex
    });
  };

  onShowResult = () => {
    Animated.timing(
      this.state.finishAnimation, // The value to drive
      {
        toValue: 2,
        useNativeDriver: true,
        easing: Easing.ease
      }
    ).start();
  };

  renderFooterButtons = () => {
    const translateY = this.state.finishAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100]
    });

    if (this.state.currentIndex < this.props.swiper.election.questions.length) {
      return (
        <Animated.View
          style={[
            styles.yesNoControls,
            {
              transform: [{ translateY }]
            }
          ]}
        >
          <NoButton
            onPress={() => {
              if (!this.state.isSwipingBack) {
                this.setIsSwipingBack(true, () => {
                  this.swiper._forceLeftSwipe();
                });
              }
            }}
            disabled={this.state.isSwipingBack}
          />
          <TouchableOpacity onPress={() => { this.swipeNext(); }} style={{ paddingLeft: 10, paddingRight: 10, flexDirection: 'column', alignItems: "center", justifyContent: "center" }}>
            <Skip width={20} height={20} />
            <Txt style={{ fontSize: 12, color: '#fff', paddingTop: 5 }}>{t('swiper.skip')}</Txt>
          </TouchableOpacity>
          <YesButton
            onPress={() => {
              if (!this.state.isSwipingBack) {
                this.setIsSwipingBack(true, () => {
                  this.swiper._forceRightSwipe();
                });
              }
            }}
            disabled={this.state.isSwipingBack}
          />
        </Animated.View>
      );
    }

    return null;
  };

  renderHeader = () => {
    const translateY = this.state.finishAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -100]
    });

    const opacity = this.state.finishAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });

    const translateYParties = this.state.finishAnimation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [-100, 0, -100]
    });

    const opacityParties = this.state.finishAnimation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0]
    });

    const translateYResult = this.state.finishAnimation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [-100, -100, 0]
    });

    const opacityResult = this.state.finishAnimation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 0, 1]
    });

    return (
      <View style={styles.header}>
        <Animated.View
          style={[
            styles.headerAbsolute,
            {
              transform: [{ translateY }],
              opacity
            }
          ]}
        >
          <View style={styles.headerLeft}>
            <PrevButton
              onPress={() => {
                this.swipePrev();
              }}
              disabled={this.state.currentIndex < 1}
            />
            <NextButton
              onPress={() => {
                this.swipeNext();
              }}
              disabled={
                this.state.currentIndex + 1 >
                this.props.swiper.election.questions.length
              }
            />
          </View>
          <View style={styles.headerTitle}>
            <Txt medium style={styles.headerTitleText}>
              {t('swiper.questionNumber', this.state.currentIndex + 1 >
              this.props.swiper.election.questions.length
                ? this.props.swiper.election.questions.length
                : this.state.currentIndex + 1, this.props.swiper.election.questions.length)}
            </Txt>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.headerAbsolute,
            {
              transform: [{ translateY: translateYParties }],
              opacity: opacityParties
            }
          ]}
        >
          <View style={styles.headerLeft}>
            {Platform.OS !== 'android' ? <PrevButton
              onPress={() => {
                this.goToLastCard();
              }}
              disabled={this.state.currentIndex < 1}
            /> : null}
          </View>
          <View style={styles.headerTitle}>
            <Txt medium style={styles.headerTitleText}>
              {t('swiperResult.chooseParties')}
            </Txt>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.headerAbsolute,
            {
              transform: [{ translateY: translateYResult }],
              opacity: opacityResult
            }
          ]}
        >
          {/* <View style={styles.headerLeft}>
            <PrevButton
              onPress={() => {
                this.goToParties();
              }}
            />
          </View> */}
          <View style={styles.headerTitle}>
            <Txt medium style={styles.headerTitleText}>
              {t('swiperResult.yourResult')}
            </Txt>
          </View>
        </Animated.View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => {
              this.props.swiper.clearAnswers();
              this.props.navigation.dispatch({ type: "Navigation/BACK" });
            }}
            style={styles.headerButton}
          >
            <Close />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderCardStack() {
    if (Platform.OS === 'ios') {
      return (
        <Swiper
          ref={swiper => (this.swiper = swiper)}
          cards={this.props.swiper.election.questions.peek()}
          renderCard={cardData => (
            <Card
              {...cardData}
              playVideo={(uri, videoLegacy, id, title, thesis) => {
                /* firebase
                  .analytics()
                  .logEvent("video_played", { id, title, thesis }); */
                this.setState({
                  video: { uri },
                  videoLegacy
                });
              }}
            />
          )}
          renderNoMoreCards={() => {
            // firebase.analytics().logEvent("swiper_completed");
            return (
              <SelectParties
                navigation={this.props.navigation}
                onShowResult={this.onShowResult}
                ref={selectPartiesRef =>
                  (this.selectPartiesRef = selectPartiesRef)
                }
              />
            );
          }}
          onClickHandler={() => true}
          cardKey="id"
          showYup
          showNope
          showMaybe
          stack
          stackDepth={3}
          stackOffsetX={0}
          stackOffsetY={20}
          hasMaybeAction={false}
          dragY={false}
          renderNope={this.nopeView}
          renderYup={this.yupView}
          handleNope={this.onDragLeft}
          handleYup={this.onDragRight}
          onFinishedAnimation={() => {
            this.setIsSwipingBack(false);
          }}
        />
      );
    }
    if (Platform.OS === 'android' && this.state.noMoreCards === true) {
      return (
        <SelectParties
          navigation={this.props.navigation}
          onShowResult={this.onShowResult}
          ref={selectPartiesRef =>
            (this.selectPartiesRef = selectPartiesRef)
          }
        />
      );
    }

    return (
      <Swiper
        ref={swiper => (this.swiper = swiper)}
        cards={this.props.swiper.election.questions.peek()}
        renderCard={cardData => (
          <Card
            {...cardData}
            playVideo={(uri, videoLegacy, id, title, thesis) => {
              /* firebase
                .analytics()
                .logEvent("video_played", { id, title, thesis });*/
              this.setState({
                video: { uri },
                videoLegacy
              });
            }}
          />
        )}
        renderNoMoreCards={() => {
          // firebase.analytics().logEvent("swiper_completed");
          this.setState({
            noMoreCards: true,
          });
          return (
            <SelectParties
              navigation={this.props.navigation}
              onShowResult={this.onShowResult}
              ref={selectPartiesRef =>
                (this.selectPartiesRef = selectPartiesRef)
              }
            />
          );
        }}
        onClickHandler={() => true}
        cardKey="id"
        showYup
        showNope
        showMaybe
        stack
        stackDepth={3}
        stackOffsetX={0}
        stackOffsetY={20}
        hasMaybeAction={false}
        dragY={false}
        renderNope={this.nopeView}
        renderYup={this.yupView}
        handleNope={this.onDragLeft}
        handleYup={this.onDragRight}
        onFinishedAnimation={() => {
          this.setIsSwipingBack(false);
        }}
      />
    );
  }

  getAnswer = id => {
    if (
      this.props.swiper.editAnswers[id] == null
    ) {
      return { doubleWeight: false, answer: 0 };
    }

    return this.props.swiper.editAnswers[id];
  };

  render() {
    return (
      <Container noPadding>
        <View style={styles.root}>
          {this.renderHeader()}

          {/* CONTENT */}
          <View style={styles.content}>
            <View style={styles.swiper}>
              {this.renderCardStack()}
            </View>

            {this.renderFooterButtons()}
          </View>
        </View>

        {this.state.video !== false ? (
          <FullScreenVideo
            source={this.state.video}
            legacy={this.state.videoLegacy}
            onClose={() => {
              this.setState({
                video: false,
                videoLegacy: false
              });
            }}
          />
        ) : null}

        {this.props.swiper.editAnswers !== false ?
          <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, zIndex: 1000 }}>
            <Container noPadding>
              <View style={styles.root}>
                <View style={styles.header}>
                  <View style={styles.headerAbsolute}>
                    <View style={styles.headerLeft}>
                      <PrevButton
                        onPress={() => {
                          this.props.swiper.closeEditAnswers();
                        }}
                      />
                    </View>
                    <View style={styles.headerTitle}>
                      <Txt medium style={styles.headerTitleText}>
                      {t('swiperResult.editAnswers')}
                      </Txt>
                    </View>
                  </View>
                  <View style={styles.headerRight}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.swiper.closeEditAnswers();
                      }}
                      style={styles.headerButton}
                    >
                      <Close />
                    </TouchableOpacity>
                  </View>
                </View>
    
                <View style={styles.content}>
                  <View style={styles.container}>
                    <ScrollView style={{ marginTop: 10 }}>
                      <View style={styles.editAnswersContainer}>
                        {this.props.swiper.election.questions.map(question => {
                          const answer = this.getAnswer(question.id).answer;
                          const doubleWeight = this.getAnswer(question.id).doubleWeight;
    
                          return (
                            <View style={{ marginBottom: 20, marginTop: 10 }} key={question.id}>
                              <BoxGradient>
                                <Title mainBig style={{ fontSize: 16, lineHeight: 20, color: '#fff' }}>{question.question}</Title>
                                <TouchableOpacity onPress={() => { this.props.swiper.toggleEditDoubleWeight(question.id); }} style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                                  <View style={{ borderRadius: 3, borderWidth: 2, width: 20, borderColor: '#fff', height: 20, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                    {doubleWeight === true ? <Check /> : null}
                                  </View>
                                  <Txt style={{ color: '#fff' }}>{t('swiper.doubleWeight')}</Txt>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', width: '100%', paddingTop: 15 }}>
                                  <TouchableOpacity activeOpacity={1} onPress={() => { this.props.swiper.setEditAnswer(question.id, 1); }} style={[ { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }, styles.editAnswer, answer === 1 ? styles.editAnswerActive : null]}>
                                    <Txt medium style={{ color: answer === 1 ? '#3A3155' : '#fff' }}>{t('swiper.no')}</Txt>
                                  </TouchableOpacity>
                                  <TouchableOpacity activeOpacity={1} onPress={() => { this.props.swiper.setEditAnswer(question.id, 0); }} style={[{ borderLeftWidth: 0, borderRightWidth: 0 }, styles.editAnswer, answer === 0 ? styles.editAnswerActive : null]}>
                                    <Txt medium style={{ color: answer === 0 ? '#3A3155' : '#fff' }}>{t('swiper.none')}</Txt>
                                  </TouchableOpacity>
                                  <TouchableOpacity activeOpacity={1} onPress={() => { this.props.swiper.setEditAnswer(question.id, 2); }} style={[{ borderBottomRightRadius: 5, borderTopRightRadius: 5 }, styles.editAnswer, answer === 2 ? styles.editAnswerActive : null]}>
                                    <Txt medium style={{ color: answer === 2 ? '#3A3155' : '#fff' }}>{t('swiper.yes')}</Txt>
                                  </TouchableOpacity>
                                </View>
                              </BoxGradient>
                            </View>
                          );
                        })}
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </View>
            </Container>

            {this.props.swiper.changedAnswers === true ?
              <View
                style={[
                  styles.progress
                ]}
              >
                <LinearGradient
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  colors={["rgba(0, 0, 0, 1)", "transparent"]}
                  style={styles.progressBg}
                >
                  <ButtonGradient
                    onPress={() => {
                      this.props.swiper.startUpdating();
                      setTimeout(() => {
                        this.props.swiper.updateResult();
                      }, 500);
                      
                    }}
                    text={t('swiperResult.yourResult')}
                  />
                </LinearGradient>
              </View>
              : null}
            </View>
          : null
        }

      </Container>
    );
  }
}

export default inject("app", "swiper")(observer(ElectionSwiper));
