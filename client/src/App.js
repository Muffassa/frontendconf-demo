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
    }
  }
`;

export const App = () => (
  <ApolloProvider client={client}>
    <Query query={GET_ALL_MOVIES} variables={{ page: 1 }}>
      {({ loading, data: { allMovies }, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;

        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap"
            }}
          >
            {allMovies.map(movie => (
              <MoviePreview movie={movie} key={movie.id} />
            ))}
          </div>
        );
      }}
    </Query>
  </ApolloProvider>
);

const MoviePreview = ({ movie: { poster, title } }) => (
  <div>
    <img src={poster} width="400" height="auto" />
    <div>{title}</div>
  </div>
);
