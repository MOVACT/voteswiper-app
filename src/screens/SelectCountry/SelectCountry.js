import React from "react";
import { View } from "react-native";
import { Container, ScrollContainer, Txt, BoxGradient } from "components";
import { Title, CountryPill } from "components";
import { t } from "util";
import styles from "./styles";

class SelectCountry extends React.Component {
  render() {
    return (
      <Container>
        <ScrollContainer withPadding>
          <BoxGradient>
            <Title mainBig center>{t('selectCountry.title')}</Title>
            <Txt copy center>{t('selectCountry.introText')}</Txt>
          </BoxGradient>

          <View style={styles.countriesList}>
            <CountryPill locale="at" name="Austria" />
            <CountryPill locale="fr" name="France" />
            <CountryPill locale="de" name="Germany" />
            <CountryPill locale="pl" name="Poland" />
          </View>
        </ScrollContainer>
      </Container>
    );
  }
}

export default SelectCountry;
