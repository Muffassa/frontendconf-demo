export default `
  type MoviePreview {
    id: String!
    title: String!
    poster: String!
  }

  type Movie {
    id: String!
    title: String!
    poster: String!
    description: String!
  }

  type Query {
    allMovies(pageNumber: Int!): [MoviePreview]!
    getMovie(movieId: Int!): Movie!
    searchMovie(query: String!): [MoviePreview]!
  }
`;
