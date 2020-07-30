// Configuration for TMDB
// https://developers.themoviedb.org/

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '6ee25636d25df9899ed46e80a13383ff';

const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&query=`;
const POPULAR_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}`; // not used currently
const TRENDING_BASE_URL = `${API_URL}trending/movie/week?api_key=${API_KEY}`;

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
// Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';
// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500';

export {
  API_URL,
  API_KEY,
  BACKDROP_SIZE,
  IMAGE_BASE_URL,
  POPULAR_BASE_URL,
  POSTER_SIZE,
  SEARCH_BASE_URL,
  TRENDING_BASE_URL,
};
