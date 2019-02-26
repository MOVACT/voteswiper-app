import * as RNLocalize from "react-native-localize";
import { config } from 'common';
import { app } from "stores";
import translations from "translations";
import locale from "./locale";

const lang = function() {
  const args = arguments;

  const strings = translations[locale()];
  const string = args[0];

  if (typeof strings[string] === "undefined") {
    // Fallback
    if (typeof translations[config.fallbackLocale][string] === "undefined") {
      return "#UNDEFINED#";
    }

    return translations[config.fallbackLocale][string].replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match;
    });
  }

  return strings[string].replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match;
  });
};

export default lang;