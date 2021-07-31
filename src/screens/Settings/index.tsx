import config from 'common/config';
import BoxGradient from 'components/BoxGradient';
import ButtonGradient from 'components/ButtonGradient';
import Container from 'components/Container';
import ScrollContainer from 'components/ScrollContainer';
import Title from 'components/Title';
import Txt from 'components/Txt';
import {useApp} from 'contexts/app';
import React from 'react';
import {I18nManager, TouchableOpacity, View} from 'react-native';
import RNRestart from 'react-native-restart';
import translations from 'translations';
import styles from './styles';

const Settings: React.FC = () => {
  const {language, setLocale, t} = useApp();

  const [pick, setPick] = React.useState<null | string>(null);

  const activeStyle = (lang: string) => {
    if (pick !== null) {
      if (lang === pick) {
        return styles.activeLanguage;
      }

      return null;
    }

    if (language === lang || (lang === 'default' && language === null)) {
      return styles.activeLanguage;
    }

    return null;
  };

  return (
    <Container>
      <ScrollContainer withPadding>
        <BoxGradient>
          <Title mainBig center>
            {t('settingsLanguage.boxTitle')}
          </Title>
          <Txt copy center>
            {t('settingsLanguage.boxText')}
          </Txt>
        </BoxGradient>
        <View>
          <TouchableOpacity
            onPress={() => {
              if (language === null) {
                setPick(null);
              } else {
                setPick('default');
              }
            }}
            style={[styles.language, activeStyle('default')]}>
            <Txt copy medium>
              {t('settings.systemDefault')}
            </Txt>
            <Txt copy>{t('settings.systemDefaultText')}</Txt>
          </TouchableOpacity>
          {config.locales.map((lang) => {
            console.log(config.rtlLocales.indexOf(lang) > -1);
            return (
              <TouchableOpacity
                onPress={() => {
                  if (language === lang) {
                    setPick(null);
                  } else {
                    setPick(lang);
                  }
                }}
                style={[styles.language, activeStyle(lang)]}
                key={lang}>
                <Txt
                  copy
                  medium
                  style={
                    config.rtlLocales.indexOf(lang) > -1
                      ? styles.rtl
                      : styles.ltr
                  }>
                  {/* @ts-ignore */}
                  {translations[lang].name}
                </Txt>
              </TouchableOpacity>
            );
          })}
        </View>
        {pick !== null && <View style={styles.offset} />}
      </ScrollContainer>

      {pick !== null && (
        <View style={styles.button}>
          <ButtonGradient
            text="Save"
            onPress={() => {
              setLocale(pick === 'default' ? null : pick);
              setTimeout(() => {
                I18nManager.forceRTL(config.rtlLocales.indexOf(pick) > -1);

                RNRestart.Restart();
              }, 500);
            }}
          />
        </View>
      )}
    </Container>
  );
};

export default Settings;
