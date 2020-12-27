import BoxGradient from 'components/BoxGradient';
import Container from 'components/Container';
import Loader from 'components/Loader';
import ScrollContainer from 'components/ScrollContainer';
import Title from 'components/Title';
import Txt from 'components/Txt';
import {useSwiper} from 'contexts/swiper';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import Check from 'icons/Check';
import LinearGradient from 'react-native-linear-gradient';
import ButtonGradient from 'components/ButtonGradient';
import {useNavigation} from '@react-navigation/native';
import {useApp} from 'contexts/app';

const SwiperEditAnswers: React.FC = () => {
  const {t} = useApp();
  const {
    editAnswers,
    changedAnswers,
    startUpdating,
    updateResult,
    loadingRecalculated,
    toggleEditDoubleWeight,
    setEditAnswer,
    election,
  } = useSwiper();
  const {goBack} = useNavigation();

  const getAnswer = React.useCallback(
    (id: number) => {
      if (editAnswers === false || editAnswers[id] == null) {
        return {doubleWeight: false, answer: 0};
      }

      return editAnswers[id];
    },
    [editAnswers],
  );

  if (editAnswers === false) {
    return (
      <Container>
        <Loader fullscreen />
      </Container>
    );
  }

  return (
    <Container>
      <ScrollContainer contentContainerStyle={styles.container}>
        {election!.questions.map((question) => {
          const userAnswer = getAnswer(question.id);
          const answer = userAnswer.answer;
          const doubleWeight = userAnswer.doubleWeight;

          return (
            <View key={question.id} style={styles.question}>
              <BoxGradient>
                <Title mainBig style={styles.title}>
                  {question.question}
                </Title>

                <TouchableOpacity
                  onPress={() => {
                    toggleEditDoubleWeight(question.id);
                  }}
                  style={styles.doubleWeightToggle}>
                  <View style={styles.checkbox}>
                    {doubleWeight === true ? <Check /> : null}
                  </View>
                  <Txt style={styles.doubleWeightText}>
                    {t('swiper.doubleWeight')}
                  </Txt>
                </TouchableOpacity>

                <View style={styles.answer}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      setEditAnswer(question.id, 1);
                    }}
                    style={[
                      styles.optionLeft,
                      styles.option,
                      answer === 1 ? styles.optionActive : null,
                    ]}>
                    <Txt
                      medium
                      style={answer === 1 ? styles.activeText : styles.white}>
                      {t('swiper.no')}
                    </Txt>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      setEditAnswer(question.id, 0);
                    }}
                    style={[
                      styles.option,
                      answer === 0 ? styles.optionActive : null,
                    ]}>
                    <Txt
                      medium
                      style={answer === 0 ? styles.activeText : styles.white}>
                      {t('swiper.none')}
                    </Txt>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      setEditAnswer(question.id, 2);
                    }}
                    style={[
                      styles.optionRight,
                      styles.option,
                      answer === 2 ? styles.optionActive : null,
                    ]}>
                    <Txt
                      medium
                      style={answer === 2 ? styles.activeText : styles.white}>
                      {t('swiper.yes')}
                    </Txt>
                  </TouchableOpacity>
                </View>
              </BoxGradient>
            </View>
          );
        })}
      </ScrollContainer>

      {changedAnswers && (
        <View style={styles.progress}>
          <LinearGradient
            start={{x: 0, y: 0.5}}
            end={{x: 0, y: 0}}
            colors={['rgba(0, 0, 0, 0.95)', 'transparent']}
            style={styles.progressBg}>
            <ButtonGradient
              onPress={() => {
                // navigate('Result');
                startUpdating();
                setTimeout(() => {
                  updateResult();
                  goBack();
                }, 500);
              }}
              text={t('swiperResult.yourResult')}
              disabled={loadingRecalculated}
            />
          </LinearGradient>
        </View>
      )}
    </Container>
  );
};

export default SwiperEditAnswers;
