import * as RNLocalize from 'react-native-localize';
import stores from 'stores';
import config from 'common/config';

function currentLocale() {
  if (stores.app.language === null) {
    return RNLocalize.findBestAvailableLanguage(config.locales).languageTag;
  }

  if (config.locales.indexOf(stores.app.language) > -1) {
    return stores.app.language;
  }

  return config.fallbackLocale;
}

export default currentLocale;
