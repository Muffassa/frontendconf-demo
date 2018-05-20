const getPosterUrl = posterPath =>
  `https://image.tmdb.org/t/p/w500${posterPath}`;

export default {
  Query: {
    allMovies: async (parent, { pageNumber }, { models }) => {
      const response = await models.Movie.getAll(pageNumber);
      const { results } = await response.json();
      return results.map(({ title, id, poster_path }) => ({
        id,
        title,
        poster: getPosterUrl(poster_path)
      }));
    },
    getMovie: async (parent, { movieId }, { models }) => {
      const response = await models.Movie.getMovie(movieId);
      const {
        id,
        original_title,
        overview,
        poster_path
      } = await response.json();

      return {
        id,
        title: original_title,
        description: overview,
        poster: getPosterUrl(poster_path)
      };
    },
    searchMovie: async (parent, { query }, { models }) => {
      const response = await models.Movie.search(query);
      const { results } = await response.json();
      return results.map(({ title, id, poster_path }) => ({
        id,
        title,
        poster: getPosterUrl(poster_path)
      }));
    }
  }
};
