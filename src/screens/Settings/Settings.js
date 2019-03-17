import React from "react";
import { View, RefreshControl, TouchableOpacity } from "react-native";
import { inject, observer } from "mobx-react/native";
import RNRestart from 'react-native-restart';
import { Container, ScrollContainer, Txt, BoxGradient } from "components";
import { Title, ButtonGradient } from "components";
import { t } from "util";
import styles from "./styles";
import { config } from "common";
import translations from "translations";

class Settings extends React.Component {
  static navigationOptions = {
    headerTitle: t('settings.title'),
  }

  constructor(props) {
    super(props);

    this.state = {
      pick: null,
    };
  }

  activeStyle(lang) {
    if (this.state.pick !== null) {
      if (lang === this.state.pick) {
        return styles.activeLanguage;
      }

      return null;
    }

    if (this.props.app.language === lang | (lang === 'default' && this.props.app.language === null)) {
      return styles.activeLanguage;
    }

    return null;
  }

  render() {
    const { language } = this.props.app;
    console.log(language);
    return (
      <Container>
        <ScrollContainer
          withPadding
        >
          <BoxGradient>
            <Title mainBig center>{t('settingsLanguage.boxTitle')}</Title>
            <Txt copy center>{t('settingsLanguage.boxText')}</Txt>
          </BoxGradient>
          <View style={styles.languages}>
            <TouchableOpacity
              onPress={() => {
                if (language === null) {
                  this.setState({
                    pick: null,
                  });
                } else {
                  this.setState({
                    pick: 'default',
                  });
                }
              }}
              style={[styles.language, this.activeStyle('default')]}
            >
              <Txt copy medium style={styles.languageTitle}>{t('settings.systemDefault')}</Txt>
              <Txt copy style={styles.languageText}>{t('settings.systemDefaultText')}</Txt>
            </TouchableOpacity>
            {config.locales.map(lang => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (language === lang) {
                      this.setState({
                        pick: null,
                      });
                    } else {
                      this.setState({
                        pick: lang,
                      });
                    }
                  }}
                  style={[styles.language, this.activeStyle(lang)]}
                  key={lang}
                >
                  <Txt copy medium>{translations[lang].name}</Txt>
                </TouchableOpacity>
              )
            })}
          </View>
          {this.state.pick !== null ?
            <View style={{ paddingTop: 10 }}>
              <ButtonGradient
                text="Save"
                onPress={() => {
                  this.props.app.setLanguage(this.state.pick);
                  RNRestart.Restart();
                }}
              />
            </View>
            : null}
          <View style={{ height: 90 }} />
        </ScrollContainer>
      </Container>
    );
  }
}

export default inject('app')(observer(Settings));
