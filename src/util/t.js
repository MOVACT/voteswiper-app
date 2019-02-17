import * as RNLocalize from "react-native-localize";
import { config } from 'common';
import { app } from "stores";
import translations from "translations";

const lang = (string) => {
  console.log(RNLocalize.getLocales());
  const strings = translations.en;

  if (typeof strings[string] === "undefined") {
    // Fallback
    if (typeof translations[config.fallbackLocale][string] === "undefined") {
      return "#UNDEFINED#";
    }

    return translations[config.fallbackLocale][string];
  }

  return strings[string];
};

export default lang;