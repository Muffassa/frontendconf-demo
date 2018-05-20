import fetch from "node-fetch";
const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "6005fe940b00f9cd81beaa167dc71872";
const apiRequest = (path, { query = "" }) =>
  fetch(`${API_URL}${path}?api_key=${API_KEY}&${query}`);
export default {
  getAll: pageNumber =>
    apiRequest("/discover/movie", { query: `page=${pageNumber}` }),
  getMovie: id => apiRequest(`/movie/${id}`),
  search: query => apiRequest(`/search/movie`, { query: `query=${query}` })
};
