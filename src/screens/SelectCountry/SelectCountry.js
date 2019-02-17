import React from "react";
import { View } from "react-native";
import { inject, observer } from "mobx-react/native";
import { Container, ScrollContainer, Txt, BoxGradient } from "components";
import { Title, CountryPill, Loader } from "components";
import { t, Query } from "util";
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
          
          <Query
            query="GET_COUNTRIES"
          >
            {({ loading, error, data }) => {
              if (loading) return <Loader />;
              if (error) return <View />;

              return (
                <View style={styles.countriesList}>
                  {data.countries.map(country => {
                    return (
                      <CountryPill
                        onPress={() => {
                          this.props.app.setCountry(country);
                        }}
                        key={country.id}
                        locale={country.country_code}
                        name={country.name}
                      />
                    );
                  })}
                </View>
              );
            }}
          </Query>
        </ScrollContainer>
      </Container>
    );
  }
}

export default inject('app')(observer(SelectCountry));
