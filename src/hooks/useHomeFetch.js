import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../utils/config';

const useHomeFetch = () => {
  const [state, setState] = useState({ movies: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMovies = async (endpoint) => {
    setError(false);
    setLoading(true);

    // If the endpoint passed in contains the string 'page', we know its a request to load more movies.
    // If its a request to load more movies will need to be appended to state, rather than a search request where
    // movies will need to be wiped and repopulated
    const isLoadMore = endpoint.search('page');

    try {
      const result = await (await fetch(endpoint)).json();

      setState((prev) => ({
        ...prev,
        movies:
          isLoadMore !== -1
            ? [...prev.movies, ...result.results]
            : [...result.results],
        currentPage: result.page,
        totalPages: result.total_pages,
      }));
    } catch (err) {
      console.log(err);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    // fetchMovies(`${API_URL}movie/popular?api_key=${API_KEY}`);
    fetchMovies(`${API_URL}trending/movie/week?api_key=${API_KEY}`);
  }, []);

  return [{ state, loading, error }, fetchMovies];
};

export default useHomeFetch;
