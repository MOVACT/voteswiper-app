import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {
  View,
  Easing,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {useHeaderHeight} from '@react-navigation/stack';
import Swiper from 'react-native-deck-swiper';
import axios from 'axios';
import config from 'common/config';
import LinearGradient from 'react-native-linear-gradient';
import Container from 'components/Container';
// import Swiper from 'components/Swiper/Swiper';
import Txt from 'components/Txt';
import FullScreenVideo from 'components/FullScreenVideo';
import Title from 'components/Title';
import BoxGradient from 'components/BoxGradient';
import ButtonGradient from 'components/ButtonGradient';
import NoButton from './partials/NoButton';
import YesButton from './partials/YesButton';
import Card from './partials/Card';
import PrevButton from './partials/PrevButton';
import NextButton from './partials/NextButton';
import styles from './styles2';
import SelectParties from './SelectParties';
import Close from 'icons/Close';
import t from 'util/t';
import Skip from 'icons/Skip';
import Check from 'icons/Check';
import {useSwiper} from 'contexts/swiper';

const ElectionSwiper: React.FC = () => {
  const {election, setAnswer} = useSwiper();
  const headerHeight = useHeaderHeight();

  const trackAnswer = React.useCallback(
    (answer: number, question: number) => {
      axios.post(
        config.apiUrl,
        {
          query: `mutation Swipe($election_id: Int!, $question_id: Int!, $answer: Int!, $platform: String!) {
        swipe(election_id: $election_id, question_id: $question_id, answer: $answer, platform: $platform) {
          success
        }
      }`,
          variables: {
            election_id: election.id,
            question_id: question,
            answer: answer,
            platform: Platform.OS,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    },
    [election],
  );

  return (
    <Container noPadding>
      <View style={styles.root}>
        <View style={{...styles.header, height: headerHeight}}>
          <View style={styles.headerLeft}>
            <PrevButton onPress={() => {}} disabled={false} />
            <NextButton onPress={() => {}} disabled={false} />
          </View>
        </View>
        <Swiper
          cards={election.questions}
          keyExtractor={(card) => card.id.toString()}
          renderCard={(card) => {
            return (
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {card.text}
              </View>
            );
          }}
          showSecondCard
          stackSize={2}
          stackSeparation={30}
        />
      </View>
    </Container>
  );
};

export default ElectionSwiper;
