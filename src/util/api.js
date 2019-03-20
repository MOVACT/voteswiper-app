import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import locale from "./locale";

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
  GET_FAQ
};

class ApiQuery extends React.Component {
  static defaultProps = {
    variables: {}
  };

  getVariables = () => {
    const variables = {
      ...this.props.variables
    };

    variables.locale = locale();

    return variables;
  }
  render() {
    const props = this.props;

    return (
      <Query
        fetchPolicy="network-only"
        notifyOnNetworkStatusChange
        {...props}
        query={queries[this.props.query]}
        variables={this.getVariables()}
      >
        {this.props.children}
      </Query>
    )
  }
}

export default ApiQuery;