import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { MoviesList } from "./components";

const GET_ALL_MOVIES_QUERY = gql`
  {
    allMovies(pageNumber: 1) {
      id
      title
      poster
    }
  }
`;

const SEARCH_MOVIES_QUERY = gql`
  query($query: String!) {
    searchMovie(query: $query) {
      id
      title
      poster
    }
  }
`;

const Input = styled.input`
  margin-bottom: 50px;
  margin-left: 150px;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: null
    };
  }

  changeInputValue = ({ target: { value } }) => {
    this.setState({ query: value });
  };

  render() {
    return (
      <Fragment>
        <Input value={this.state.query} onChange={this.changeInputValue} />
        <p>{this.state.query}</p>
        <p>{JSON.stringify(Boolean(this.state.query))}</p>
        <Query
          query={SEARCH_MOVIES_QUERY}
          variables={{ query: this.state.query }}
          skip={!Boolean(this.state.query)}
          delay
        >
          {({ loading, error, data, client }) => {
            if (loading) return <p>...Loading</p>;
            if (error) return <p>{JSON.stringify(error)}</p>;
            return (
              <Fragment>
                <MoviesList movies={data.searchMovie} />
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default App;
