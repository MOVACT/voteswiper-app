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
      elections_count
    }
  }
`;

const queries = {
  GET_COUNTRIES,
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