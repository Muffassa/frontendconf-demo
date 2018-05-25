import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from 'styled-components';

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
      <Query query={GET_ALL_MOVIES} variables={{ page: this.state.page }}>
        {({ loading, data: { allMovies = [] }, error, fetchMore, variables: { page } }) => {
          let content;
          if (loading) { content = <div>Loading</div> } else
            if (error) { content = <div>Error</div> } else {
              content = (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                    marginTop: '35px',
                  }}
                >
                  {allMovies.map(movie => (
                    <MoviePreview movie={movie} key={movie.id} />
                  ))}
                </div>
              )
            }
          return (
            <input type="checkbox" />
            <div style={{ margin: '0 auto' }}>
              <Button onClick={() => this.setState({ page: page === 1 ? page : page - 1 })}>PREV</Button>
              <Button onClick={() => this.setState({ page: page + 1 })}>NEXT</Button>
              {content}
            </div>
          );
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
