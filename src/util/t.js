import * as RNLocalize from "react-native-localize";
import { config } from 'common';
import { app } from "stores";
import translations from "translations";
import locale from "./locale";

const lang = (string) => {
  const strings = translations[locale()];

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