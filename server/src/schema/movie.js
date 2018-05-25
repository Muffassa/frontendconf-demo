export default `
type Tag {
  id: Int!
  text: String!
}

type MoviePreview {
  id: String!
  title: String
  poster: String
  vote_count: Int
  video: Boolean
  voteAverage: Int
  popularity: Int
  originalLanguage: String
  original_title: String
  genre_ids: [Int]
  backdrop_path: String
  adult: Boolean
  overview: String
  release_date: String
  tags: [Tag]
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
`
