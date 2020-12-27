import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {View, Platform} from 'react-native';
import {Question} from 'types/api';
import styles from './styles';
import cdn from 'util/cdn';
import Play from 'icons/Play';
import SvgCircleInfo from 'icons/InfoCircle';
import Title from 'components/Title';
import Animated, {Easing} from 'react-native-reanimated';
import {useSwiper} from 'contexts/swiper';
import Txt from 'components/Txt';
import {useNavigation} from '@react-navigation/native';
import {useApp} from 'contexts/app';

const Card: React.FC<Question> = ({
  id,
  thumbnail,
  video_url,
  explainer_text,
  title,
  question,
}) => {
  const {navigate} = useNavigation();
  const {t} = useApp();
  const {getDoubleWeightValue, toggleDoubleWeight} = useSwiper();
  const borderAnimation = React.useRef(
    new Animated.Value(getDoubleWeightValue(id) === false ? 0 : 1),
  );
  const cardThumbnail = React.useMemo(() => {
    return (
      <View style={styles.thumbnail}>
        <Image source={{uri: cdn(thumbnail)}} style={styles.thumbnailImage} />
        {video_url || explainer_text ? (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.videoLink}
            onPress={() => {
              if (video_url) {
                navigate('Video', {
                  video: video_url,
                });
              } else {
                navigate('Explainer', {
                  explainer: explainer_text,
                  question,
                  title,
                });
              }
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={['#DB67AE', '#8186D7']}
              style={styles.videoButton}>
              {video_url ? (
                <Play height={24} width={21} />
              ) : (
                <SvgCircleInfo style={styles.infoIcon} />
              )}
            </LinearGradient>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }, [thumbnail, video_url, explainer_text, navigate, question, title]);

  const border = React.useMemo(() => {
    const scaleStyle = borderAnimation.current.interpolate({
      inputRange: [0, 1],
      outputRange: [1.05, 1],
    });

    return (
      <Animated.View
        pointerEvents="none"
        style={[styles.border, {transform: [{scale: scaleStyle}]}]}
      />
    );
  }, []);

  const toggleDoubleWeightState = React.useCallback(() => {
    Animated.timing(borderAnimation.current, {
      toValue: getDoubleWeightValue(id) === false ? 1 : 0,
      duration: 150,
      easing: Easing.ease,
    }).start();
    toggleDoubleWeight(id);
  }, [id, getDoubleWeightValue, toggleDoubleWeight]);

  const isDoubleWeighted = getDoubleWeightValue(id);

  const doubleWeight = React.useMemo(() => {
    return (
      <TouchableOpacity
        onPress={toggleDoubleWeightState}
        style={[
          styles.doubleWeightContainer,
          Platform.OS === 'ios' ? styles.doubleWeightContainerIOS : null,
        ]}>
        <View
          style={[
            styles.doubleWeightLabel,
            isDoubleWeighted ? styles.doubleWeightedLabel : {},
          ]}>
          <Txt medium style={styles.doubleWeightText}>
            {isDoubleWeighted === false
              ? t('swiper.doubleWeight')
              : t('swiper.doubleWeighted')}
          </Txt>
        </View>
      </TouchableOpacity>
    );
  }, [isDoubleWeighted, toggleDoubleWeightState, t]);

  return (
    <View style={styles.card}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#FFFFFF', '#D9DAEB']}
        style={styles.inner}>
        {cardThumbnail}
        <View style={styles.content}>
          <Title h5dark uppercase center>
            {title}
          </Title>
          <Title mainBig center textCenter style={styles.questionText}>
            {question}
          </Title>

          {Platform.OS === 'android' && doubleWeight}
        </View>

        {Platform.OS === 'android' ? null : border}

        {Platform.OS === 'ios' && doubleWeight}
      </LinearGradient>
    </View>
  );
};

export default Card;
