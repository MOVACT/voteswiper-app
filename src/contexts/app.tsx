import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

interface Context {
  hydrated: boolean;
  country: null;
  language: null | string;
  languageNotice: {
    shouldShow: boolean;
  };
  setHydrated: (hydrated: boolean) => void;
  setLocale: (locale: string) => void;
  setCountry: (country: null) => void;
  dismissLanguageNotice: () => void;
}

const AppContext = React.createContext<Context>({} as Context);

const AppProvider: React.FC = ({children}) => {
  const [hydrated, setHydrated] = React.useState(false);
  const [country, setCountry] = React.useState(null);
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

      setLanguage(storedLanguage !== null ? JSON.parse(storedLanguage) : null);
      setHydrated(true);
    };
    fetchFromStorage();
  }, []);

  // persist country
  React.useEffect(() => {
    if (country === null) {
      AsyncStorage.removeItem('@country');
    } else {
      AsyncStorage.setItem('@country', JSON.stringify(country));
    }
  }, [country]);

  // persist language
  React.useEffect(() => {
    if (language === null) {
      AsyncStorage.removeItem('@language');
    } else {
      AsyncStorage.setItem('@language', JSON.stringify(language));
    }
  }, [language]);

  // persist language
  React.useEffect(() => {
    AsyncStorage.setItem('@languageNotice', JSON.stringify(languageNotice));
  }, [languageNotice]);

  const setLocale = React.useCallback((locale: string) => {
    setLanguage(locale);
    setLanguageNotice({
      shouldShow: false,
    });
  }, []);

  const dismissLanguageNotice = React.useCallback(() => {
    setLanguageNotice({
      shouldShow: false,
    });
  }, []);

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
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => React.useContext(AppContext);

export default AppProvider;
