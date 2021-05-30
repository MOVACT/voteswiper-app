import axios from 'axios';
import config from 'common/config';
import {useApp} from 'contexts/app';
import React from 'react';

export enum ENDPOINTS {
  COUNTRIES = '/countries',
  ALTERNATE_COUNTRY_SLUGS = '/alternateCountrySlugs',
  COUNTRY = '/countryBySlug',
  ELECTIONS = '/elections',
  ELECTION = '/election',
  QUESTIONS = '/questions',
  PARTIES = '/parties',
  COUNT_ANSWER = '/statistics/countAnswer',
  SAVE_RESULT = '/statistics/saveResult',
  COUNT_INITIATE = '/statistics/initiate',
}

interface FetchResponse<T> {
  loading: boolean;
  error: boolean;
  data: T;
  refetch: () => void;
}

const useFetch = <T, D = void>(
  url: ENDPOINTS,
  options?: {
    data?: D;
    method?: 'post' | 'get' | 'put' | 'delete';
  },
  locale?: string,
): FetchResponse<T> => {
  const {language} = useApp();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState<T | null>(null);

  const doRequest = React.useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: options ? options.method ?? 'post' : 'post',
        url: `${config.api}${url}`,
        data: options?.data,
        headers: {
          'Content-Type': 'application/json',
          'Content-Language': locale ? locale : language,
          Accept: `application/x.voteswiper.v${config.apiVersion}+json`,
        },
      });

      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  }, [locale, options, url, language]);

  const refetch = React.useCallback(() => {
    doRequest();
  }, [doRequest]);

  React.useEffect(() => {
    doRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    error,
    data: data as T,
    refetch,
  };
};

const fetch = <T = void>(
  url: ENDPOINTS,
  locale?: string,
  options?: {
    data?: T;
    method?: 'post' | 'get' | 'put' | 'delete';
  },
): void => {
  try {
    axios({
      method: options ? options.method ?? 'post' : 'post',
      url: `${config.api}${url}`,
      data: options?.data,
      headers: {
        'Content-Type': 'application/json',
        'Content-Language': locale,
        Accept: `application/x.voteswiper.v${config.apiVersion}+json`,
      },
    });
  } catch {}
};

export {useFetch, fetch};
