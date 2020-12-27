import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Country} from 'types/api';
import translations from 'translations';
import locale from 'util/locale';
import config from 'common/config';
import moment from 'moment';
interface Context {
  hydrated: boolean;
  country: null | Country;
  language: null | string;
  languageNotice: {
    shouldShow: boolean;
  };
  setHydrated: (hydrated: boolean) => void;
  setLocale: (locale: string | null) => void;
  setCountry: (country: null | Country) => void;
  dismissLanguageNotice: () => void;
  t: (string: string, vars?: any[]) => string;
}

const AppContext = React.createContext<Context>({} as Context);

const AppProvider: React.FC = ({children}) => {
  const initialLanguageCheck = React.useRef(true);
  const initialCountryCheck = React.useRef(true);
  const [hydrated, setHydrated] = React.useState(false);
  const [country, setCountry] = React.useState<null | Country>(null);
  const [language, setLanguage] = React.useState<null | string>(null);
  const [languageNotice, setLanguageNotice] = React.useState({
    shouldShow: true,
  });

  React.useEffect(() => {
    const fetchFromStorage = async () => {
      const storedCountry = await AsyncStorage.getItem('@country');
      const storedLanguageNotice = await AsyncStorage.getItem(
        '@languageNotice',
      );
      const storedLanguage = await AsyncStorage.getItem('@language');

      setCountry(storedCountry !== null ? JSON.parse(storedCountry) : null);

      if (storedLanguageNotice !== null) {
        setLanguageNotice(JSON.parse(storedLanguageNotice));
      }

      setLanguage(storedLanguage !== null ? storedLanguage : null);
      setHydrated(true);
    };
    fetchFromStorage();
  }, []);

  // persist country
  React.useEffect(() => {
    if (initialCountryCheck.current === true) {
      initialCountryCheck.current = false;
    } else {
      if (country === null) {
        AsyncStorage.removeItem('@country');
      } else {
        AsyncStorage.setItem('@country', JSON.stringify(country));
      }
    }
  }, [country]);

  // persist language
  React.useEffect(() => {
    if (initialLanguageCheck.current === true) {
      initialLanguageCheck.current = false;
    } else {
      if (language === null) {
        AsyncStorage.removeItem('@language');
      } else {
        AsyncStorage.setItem('@language', language).catch((err) =>
          console.log(err),
        );
      }
    }
  }, [language]);

  // persist language
  React.useEffect(() => {
    AsyncStorage.setItem('@languageNotice', JSON.stringify(languageNotice));
  }, [languageNotice]);

  const setLocale = React.useCallback((loc: string | null) => {
    setLanguage(loc);
    setLanguageNotice({
      shouldShow: false,
    });
  }, []);

  const dismissLanguageNotice = React.useCallback(() => {
    setLanguageNotice({
      shouldShow: false,
    });
  }, []);

  const t = React.useCallback(
    (string: string, vars?: any[]) => {
      // @ts-ignore
      const strings = translations[locale(language)];

      if (typeof strings[string] === 'undefined') {
        // Fallback
        if (
          // @ts-ignore
          typeof translations[config.fallbackLocale][string] === 'undefined'
        ) {
          return '#UNDEFINED#';
        }
        // @ts-ignore
        return translations[config.fallbackLocale][string].replace(
          /{(\d+)}/g,
          function (match: any, number: number) {
            return typeof vars![number - 1] !== 'undefined'
              ? vars![number - 1]
              : match;
          },
        );
      }

      return strings[string].replace(
        /{(\d+)}/g,
        function (match: any, number: number) {
          return typeof vars![number - 1] !== 'undefined'
            ? vars![number - 1]
            : match;
        },
      );
    },
    [language],
  );

  return (
    <AppContext.Provider
      value={{
        hydrated,
        country,
        language,
        languageNotice,
        setHydrated,
        setLocale,
        setCountry,
        dismissLanguageNotice,
        t,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => React.useContext(AppContext);

export default AppProvider;
