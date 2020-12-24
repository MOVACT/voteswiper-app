import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import RNRestart from 'react-native-restart';
import Container from 'components/Container';
import ScrollContainer from 'components/ScrollContainer';
import Txt from 'components/Txt';
import BoxGradient from 'components/BoxGradient';
import Title from 'components/Title';
import ButtonGradient from 'components/ButtonGradient';
import t from 'util/t';
import styles from './styles';
import config from 'common/config';
import translations from 'translations';
import {useApp} from 'contexts/app';

const Settings: React.FC = () => {
  const {language, setLocale} = useApp();

  const [pick, setPick] = React.useState(null);

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
                <Txt copy medium>
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
              setLocale(pick);
              RNRestart.Restart();
            }}
          />
        </View>
      )}
    </Container>
  );
};

export default Settings;
