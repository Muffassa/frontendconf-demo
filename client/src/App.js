import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

const GET_ALL_MOVIES = gql`
  query allMovies($page: Int!) {
    allMovies(pageNumber: $page) {
      id
      title
      poster
      tags {
        text
      }
    }
  }
`;

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1
    }
  }

  render() {
    return (<ApolloProvider client={client}>
      <Query
        query={GET_ALL_MOVIES}
        variables={{ page: this.state.page }}
        fetchPolicy="cache-first">
        {(options) => {
          ...
        }}
      </Query>
    </ApolloProvider>)
  }
}

const Button = styled.button`
  width: 50%;
  height: 50px;
  cursor: pointer;
  color: white;
  background-color: #444456;
`;

const MoviePreview = ({ movie: { poster, title } }) => (
  <div>
    <img src={poster} width="400" height="auto" />
    <div>{title}</div>
  </div>
);
