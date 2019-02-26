import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { View, StatusBar, Dimensions, TouchableOpacity } from "react-native";
// import { AdMobInterstitial } from 'react-native-admob';
import Video from "react-native-video";
import LinearGradient from "react-native-linear-gradient";
import Txt from  "../Txt/Txt";
import Loader from "../Loader/Loader";
// import { Icon, isIphoneX, shouldShowAd } from "util";
import { isIphoneX } from "util";
// import { config } from 'common';
import styles from "./styles";
import SvgClose from "../../icons/Close";

const { width } = Dimensions.get("window");

class FullScreenVideo extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    source: PropTypes.any,
    legacy: PropTypes.bool,
  };

  static defaultProps = {
    legacy: false
  };

  constructor(props) {
    super(props);

    this.currentTime = 0;
    this.interval = null;

    //this.counter = props.ads.videosSinceLastAd;

    this.state = {
      duration: 0,
      currentTime: 0,
      // status: shouldShowAd(this.counter) ? 1 : 2
      status: 2,

      // 0 === loading
      // 1 === ad
      // 2 === video
    };

    /* AdMobInterstitial.setAdUnitID(config.admob.ios.videoInterstitialId);
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.addEventListener('adClosed', () => {
      this.setState({
        status: 2,
      });
    }); */
  }

  componentDidMount() {
    if (!isIphoneX()) {
      StatusBar.setHidden(true, "slide");
    }

    // this.props.ads.increaseVideoCounter();

    /* if (shouldShowAd(this.counter) === true) {
      AdMobInterstitial.setAdUnitID(config.admob.ios.videoInterstitialId);
      AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
      AdMobInterstitial.requestAd()
        .then(() => {
          AdMobInterstitial.showAd();
          this.props.ads.resetVideoCounter();
        })
        .catch(() => {
          // no ad found, just show the video
          this.setState({
            status: 2,
          });
        });
    } */
  }

  componentWillUnmount() {
    StatusBar.setHidden(false, "slide");

    clearInterval(this.interval);
  }

  updateState = () => {
    this.setState({
      currentTime: this.currentTime
    });
  };

  calculateProgressWidth = () => {
    const timePercentage = (this.state.currentTime * 100) / this.state.duration;
    const progressBarWidth = (width * timePercentage) / 100;

    return progressBarWidth > width ? width : progressBarWidth;
  };

  renderCloseButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onClose();
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={["#464872", "#5D5D94"]}
          style={[styles.control]}
        >
          <SvgClose width="10" height="10" />
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  render() {
    if (this.state.status !== 2) {
      return (
        <View style={styles.videoPlayer}>
          <Loader fullscreen />
        </View>
      );
    }
    return (
      <View style={styles.videoPlayer}>
        <View style={styles.videoPlayerInner}>
          <Video
            source={this.props.source} // Can be a URL or a local file.
            ref={ref => {
              this.player = ref;
            }}
            resizeMode={"contain"}
            muted={false}
            style={styles.video}
            playWhenInactive={true}
            ignoreSilentSwitch={"ignore"}
            onLoad={info => {
              this.setState({
                duration: info.duration
              });

              this.interval = setInterval(this.updateState, 1000);
            }}
            onProgress={info => {
              this.currentTime = info.currentTime;
            }}
            onEnd={() => {
              this.props.onClose();
            }}
          />
          {/*
          <View
            style={[
              styles.videoProgress,
              { width: this.calculateProgressWidth() }
            ]}
          /> */}
          <View style={styles.videoToolBar}>
            <View style={styles.timeRemainingBg}>
              <Txt medium style={styles.timeRemaining}>
                {this.state.duration - this.state.currentTime < 1
                  ? 0
                  : Math.trunc(this.state.duration - this.state.currentTime)}
              </Txt>
            </View>

            {this.renderCloseButton()}
          </View>
        </View>
      </View>
    );
  }
}

export default inject('app')(observer(FullScreenVideo));
