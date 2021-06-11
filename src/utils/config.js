const REPO_LINK = 'https://github.com/chingu-voyages/v21-geckos-team-03/';

// Configuration for TMDB
// https://developers.themoviedb.org/
const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '350b584ddf1ac23fddb47c4afe61e290';
const API_LOGO =
  'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg';

const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&query=`;
const TRENDING_BASE_URL = `${API_URL}trending/movie/week?api_key=${API_KEY}`;

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
// Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';
// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500';

export {
  API_URL,
  API_KEY,
  API_LOGO,
  BACKDROP_SIZE,
  REPO_LINK,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  SEARCH_BASE_URL,
  TRENDING_BASE_URL,
};
