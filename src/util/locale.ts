import config from 'common/config';
import * as RNLocalize from 'react-native-localize';

const getCurrentLocale = (language: string | null): string => {
  if (language === null) {
    return RNLocalize.findBestAvailableLanguage(config.locales)!.languageTag;
  }

  if (config.locales.indexOf(language) > -1) {
    return language;
  }

  return config.fallbackLocale;
};

export default getCurrentLocale;
