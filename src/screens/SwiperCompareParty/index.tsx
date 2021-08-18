import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Box from 'components/Box';
import ButtonDark from 'components/ButtonDark';
import Container from 'components/Container';
import ScrollContainer from 'components/ScrollContainer';
import Title from 'components/Title';
import Txt from 'components/Txt';
import {useApp} from 'contexts/app';
import {useSwiper} from 'contexts/swiper';
import React from 'react';
import {Image, Linking, TouchableOpacity, View} from 'react-native';
import {ModalStackParamList} from 'types/routes';
import styles from './styles';

type ComparePartyScreenRouteProp = RouteProp<
  ModalStackParamList,
  'CompareParty'
>;

const SwiperCompareParty: React.FC = () => {
  const {setOptions} = useNavigation();
  const {t} = useApp();
  const {params} = useRoute<ComparePartyScreenRouteProp>();
  const {answers, election} = useSwiper();
  const [showReason, setReason] = React.useState<null | number>(null);

  React.useEffect(() => {
    setOptions({
      // {1} ile Karşılaştır
      title: `Vergleich mit ${params.party.name}`,
    });
  });

  const getAnswer = React.useCallback(
    (id: number) => {
      if (answers[election!.id][id] == null) {
        return {doubleWeight: false, answer: 0};
      }

      return answers[election!.id][id];
    },
    [answers, election],
  );

  const getPartyAnswer = React.useCallback(
    (question) => {
      return params.party.pivot.answers.find((a) => a.question_id === question);
    },
    [params.party],
  );

  const {party} = params;

  return (
    <Container noPadding>
      <ScrollContainer contentContainerStyle={styles.container}>
        <View style={styles.party}>
          <View style={styles.partyLogoContainer}>
            <Image
              source={{uri: party.logo.public_link}}
              style={styles.partyLogo}
              resizeMode="contain"
            />
          </View>

          <Txt medium style={styles.partyTitle}>
            {party.full_name}
          </Txt>

          {party.url && (
            <View style={styles.partyButton}>
              <ButtonDark
                text="Webseite"
                center
                onPress={() => {
                  Linking.openURL(party.url as string);
                }}
              />
            </View>
          )}
          {party.pivot.program_link && (
            <View style={styles.partyButton}>
              <ButtonDark
                center
                text={t('swiperResult.program')}
                onPress={() => {
                  Linking.openURL(party.pivot.program_link as string);
                }}
              />
            </View>
          )}
        </View>

        <View>
          {election!.questions.map((question) => {
            const userAnswer = getAnswer(question.id);
            const partyAnswer = getPartyAnswer(question.id);

            if (!partyAnswer || !userAnswer) {
              return null;
            }

            return (
              <Box key={question.id}>
                {userAnswer.doubleWeight === true && (
                  <View style={styles.doubleWeighted}>
                    <View style={styles.doubleWeightedLabel}>
                      <Txt medium style={styles.doubleWeightedText}>
                        {t('swiper.doubleWeighted')}
                      </Txt>
                    </View>
                  </View>
                )}
                <Title mainBig style={styles.thesis}>
                  {question.thesis}
                </Title>

                {partyAnswer.reason ? (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        if (showReason === question.id) {
                          setReason(null);

                          return null;
                        }

                        setReason(question.id);
                      }}>
                      <Txt style={styles.reasonLink} medium>
                        {showReason === question.id
                          ? t('swiperResult.closeReasoning')
                          : t('swiperResult.readReasoning')}
                      </Txt>
                    </TouchableOpacity>
                    {showReason === question.id && (
                      <View style={styles.reason}>
                        <Txt style={styles.reasonText}>
                          {partyAnswer.reason}
                        </Txt>
                      </View>
                    )}
                  </>
                ) : (
                  <Txt medium style={styles.reasonLink}>
                    {t('swiperResult.noReason')}
                  </Txt>
                )}

                <View style={styles.answers}>
                  <View style={styles.answer}>
                    <Title h5dark uppercase>
                      {t('swiperResult.yourAnswer')}
                    </Title>
                    {userAnswer.answer === 0 ? (
                      <View style={styles.noneLabel}>
                        <Txt medium style={styles.labelText}>
                          {t('swiper.none')}
                        </Txt>
                      </View>
                    ) : null}
                    {userAnswer.answer === 1 ? (
                      <View style={styles.noLabel}>
                        <Txt medium style={styles.labelText}>
                          {t('swiper.no')}
                        </Txt>
                      </View>
                    ) : null}
                    {userAnswer.answer === 2 ? (
                      <View style={styles.yesLabel}>
                        <Txt medium style={styles.labelText}>
                          {t('swiper.yes')}
                        </Txt>
                      </View>
                    ) : null}
                  </View>

                  <View style={styles.answer}>
                    <Title h5dark uppercase>
                      {t('swiperResult.party')}
                    </Title>
                    {partyAnswer.answer === 0 ? (
                      <View style={styles.noneLabel}>
                        <Txt medium style={styles.labelText}>
                          {t('swiper.none')}
                        </Txt>
                      </View>
                    ) : null}
                    {partyAnswer.answer === 1 ? (
                      <View style={styles.noLabel}>
                        <Txt medium style={styles.labelText}>
                          {t('swiper.no')}
                        </Txt>
                      </View>
                    ) : null}
                    {partyAnswer.answer === 2 ? (
                      <View style={styles.yesLabel}>
                        <Txt medium style={styles.labelText}>
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
      </ScrollContainer>
    </Container>
  );
};

export default SwiperCompareParty;
