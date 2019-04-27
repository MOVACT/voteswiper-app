import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Animated,
  Image,
  TouchableOpacity,
  Easing,
  Platform
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { withNavigation } from "react-navigation";
import { Title, Txt } from "components";
import stores from "stores";
import styles from "../styles";
import Play from "../../../icons/Play";
import { cdn, t } from "util";
import SvgCircleHelp from "../../../icons/HelpCircle";
import SvgCircleInfo from "../../../icons/InfoCircle";

class Card extends React.Component {
  static propTypes = {
    question: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    playVideo: PropTypes.func.isRequired,
    video_legacy: PropTypes.bool.isRequired,
    video_url: PropTypes.string,
    id: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.lastPress = 0;

    this.state = {
      anim: new Animated.Value(
        stores.swiper.getDoubleWeightValue(this.props.id) === false ? 0 : 1
      ),
      toggle:
        stores.swiper.getDoubleWeightValue(this.props.id) === false
          ? false
          : true
    };
  }

  /* detectDoubleTap = () => {
    const delta = new Date().getTime() - this.lastPress;

    if (delta < 300) {
      Animated.timing(this.state.anim, {
        toValue: this.state.doubleWeight === false ? 1 : 0,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true
      }).start(() => {
        this.setState({
          doubleWeight: !this.state.doubleWeight
        });
      });
    }

    this.lastPress = new Date().getTime();
  }; */

  toggleDoubleWeight = () => {
    Animated.timing(this.state.anim, {
      toValue:
        stores.swiper.getDoubleWeightValue(this.props.id) === false ? 1 : 0,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: true
    }).start(() => {
      stores.swiper.toggleDoubleWeight(this.props.id);
      this.setState({
        toggle: !this.state.toggle
      });
    });
  };

  renderBorder = () => {
    const scaleStyle = this.state.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [1.05, 1]
    });

    if (Platform.OS === "android") {
      return null;
    }

    return (
      <Animated.View
        pointerEvents="none"
        style={[styles.cardBorder, { transform: [{ scale: scaleStyle }] }]}
      />
    );
  };

  renderThumbnail = () => {
    const {
      question,
      title,
      thumbnail,
      video_url,
      video_legacy,
      explainer_text,
      id
    } = this.props;

    if (video_url !== null && video_url !== '' && typeof video_url !== "undefined") {
      return (
        <TouchableOpacity
          style={styles.videoControl}
          onPress={() => {
            this.props.playVideo(video_url, video_legacy, id, title, question);
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={["#DB67AE", "#8186D7"]}
            style={styles.videoPlay}
            activeOpacity={0.9}
          >
            <Play height={24} width={21} />
          </LinearGradient>
        </TouchableOpacity>
      );
    }

    if (explainer_text !== null && explainer_text !== '') {
      return (
        <TouchableOpacity
          style={styles.videoControl}
          onPress={() => {
            this.props.navigation.navigate("ModalQuestionInfo", {
              ...this.props
            });
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={["#DB67AE", "#8186D7"]}
            style={[styles.videoPlay, { paddingLeft: 0 }]}
            activeOpacity={0.9}
          >
            <SvgCircleInfo></SvgCircleInfo>
          </LinearGradient>
        </TouchableOpacity>
      );
    }

    return null;
  }

  render() {
    const {
      question,
      title,
      thumbnail,
      video_url,
      video_legacy,
      id
    } = this.props;

    return (
      <View style={styles.card}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["#FFFFFF", "#D9DAEB"]}
          style={[styles.cardInner]}
        >
          <View style={styles.cardVideo}>
            <Image
              source={{ uri: cdn(thumbnail) }}
              resizeMode="cover"
              style={styles.cardThumbnail}
            />
            {this.renderThumbnail()}
          </View>

          <View style={styles.cardContent}>
            <Title h5dark uppercase center>
              {title}
            </Title>
            <Title mainBig center textCenter style={{ color: '#392F52' }}>
              {question}
            </Title>
          </View>
          {this.renderBorder()}
        </LinearGradient>

        <TouchableOpacity
          onPress={this.toggleDoubleWeight}
          style={styles.doubleWeightLabelContainer}
        >
          <Animated.View
            style={[
              styles.doubleWeightLabel,
              this.state.toggle === true ? styles.doubleWeightedLabel : {}
            ]}
          >
            <Txt medium style={styles.doubleWeightLabelText}>
              {this.state.toggle === false
                ? t('swiper.doubleWeight')
                : t('swiper.doubleWeighted')}
            </Txt>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(Card);
