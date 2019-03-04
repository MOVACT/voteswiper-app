import React from "react";
import { View, Linking } from "react-native";
import { Container, ScrollContainer, Title, Txt, ButtonDark } from "components";
import { t } from "util";
import styles from "./styles";

class InfosIndex extends React.Component {
  static navigationOptions = {
    title: t('infosIndex.title'),
  };

  render() {
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

            <Txt style={styles.bodyText}>
            {t('infosIndex.paragraph2')}
            </Txt>

            <Txt style={styles.bodyText}>
              {t('infosIndex.paragraph3')}
            </Txt>

            <View style={{ height: 25 }} />

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
  }
}

export default InfosIndex;
