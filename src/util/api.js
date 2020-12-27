import React from 'react';
import gql from 'graphql-tag';
import {useQuery as useApolloQuery} from 'react-apollo';
import locale from './locale';
import {useApp} from 'contexts/app';

// Queries
const GET_COUNTRIES = gql`
  query Countries($locale: String!) {
    countries(locale: $locale) {
      id
      name
      slug
      country_code
      language_code
      elections_count
    }
  }
`;

const GET_ELECTIONS = gql`
  query Elections($locale: String!, $country: Int!) {
    elections(locale: $locale, country: $country) {
      id
      name
      slug
      card
      voting_day
      partner_logo
      partner_name
      partner_text
      voting_day
      active
      active_date
      parties {
        id
        election_id
        name
        slug
        full_name
        logo
        pivot {
          id
          program
          program_pdf
          answers {
            id
            question_id
            answer
            reason
          }
        }
      }
    }
    pastElections: elections(locale: $locale, country: $country, past: true) {
      id
      name
      slug
      card
      voting_day
      partner_logo
      partner_name
      partner_text
      voting_day
      active
      active_date
      parties {
        id
        election_id
        name
        slug
        full_name
        logo
        pivot {
          id
          program
          program_pdf
          answers {
            id
            question_id
            answer
            reason
          }
        }
      }
    }
  }
`;

const GET_QUESTIONS = gql`
  query Questoins($locale: String!, $election: Int!) {
    questions(locale: $locale, election: $election) {
      id
      question
      title
      video_url
      video_legacy
      thumbnail
      explainer_text
    }
  }
`;

const GET_FAQ = gql`
  query Faqs($locale: String!) {
    faqs(locale: $locale) {
      id
      title
      content
    }
  }
`;

const queries = {
  GET_COUNTRIES,
  GET_ELECTIONS,
  GET_QUESTIONS,
  GET_FAQ,
};

// @TODO: add types
const useQuery = (query, props = {}) => {
  const {language} = useApp();
  const vars = React.useMemo(() => {
    const queryVars = props.variables ? props.variables : {};
    queryVars.locale = locale(language);
    return queryVars;
  }, [props, language]);

  return useApolloQuery(queries[query], {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    ...props,
    variables: vars,
  });
};

export {useQuery};
