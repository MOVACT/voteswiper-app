import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import {
  View,
  Animated,
  Easing,
  TouchableOpacity,
  Platform
} from "react-native";
import { Container, Swiper, Txt, FullScreenVideo } from "components";
import NoButton from "./partials/NoButton";
import YesButton from "./partials/YesButton";
import Card from "./partials/Card";
import PrevButton from "./partials/PrevButton";
import NextButton from "./partials/NextButton";
import styles from "./styles";
import SelectParties from "./SelectParties";
import Close from "../../icons/Close";
import { t } from "util";

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

  trackAnswer = (question, answer) => {
    /* fetch("https://api.wahlswiper.de/v1/track-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        election: this.props.swiper.election.slug,
        questionId: question,
        answer: answer,
        device: Platform.OS
      })
    });*7

    // FIREBASE
    /*firebase.analytics().logEvent("thesis_answered", {
      id: question,
      election: this.props.swiper.election.slug,
      answer: answer
    });*/
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
              Parteien auswählen
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
              Dein Ergebnis
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
        cards={this.props.swiper.election.questions.slice()}
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

  render() {
    console.log(this.props.swiper.answers, this.state.currentIndex);
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
      </Container>
    );
  }
}

export default inject("app", "swiper")(observer(ElectionSwiper));