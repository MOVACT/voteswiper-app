import React from 'react';
import {View, Linking} from 'react-native';
import Container from 'components/Container';
import ScrollContainer from 'components/ScrollContainer';
import Title from 'components/Title';
import Txt from 'components/Txt';
import ButtonDark from 'components/ButtonDark';
import t from 'util/t';
import styles from './styles';

const InfosIndex: React.FC = () => {
  return (
    <Container>
      <ScrollContainer withPadding>
        <View style={styles.root}>
          <Title h1 style={styles.screenTitle}>
            {t('infosIndex.headline')}
          </Title>

          <Txt style={[styles.bodyText, styles.bodyTextFirst]}>
            {t('infosIndex.paragraph1')}
          </Txt>

          <Txt style={styles.bodyText}>{t('infosIndex.paragraph2')}</Txt>

          <Txt style={styles.bodyText}>{t('infosIndex.paragraph3')}</Txt>

          <View style={styles.offset} />

          <ButtonDark
            text={t('infosIndex.imprintButton')}
            onPress={() => {
              Linking.openURL(t('infosIndex.imprintLink'));
            }}
          />
          <ButtonDark
            text={t('infosIndex.privacyButton')}
            onPress={() => {
              Linking.openURL(t('infosIndex.privacyLink'));
            }}
          />
        </View>
      </ScrollContainer>
    </Container>
  );
};

export default InfosIndex;
