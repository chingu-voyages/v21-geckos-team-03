import { useState, useEffect, useCallback } from 'react';
import { TRENDING_BASE_URL } from '../utils/config';

const useHomeFetch = () => {
  const [state, setState] = useState({ movies: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMovies = useCallback(
    async (endpoint) => {
      setError(false);
      setLoading(true);

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
        setError(error);
      }
      setLoading(false);
    },
    [error]
  );

  useEffect(() => {
    fetchMovies(TRENDING_BASE_URL);
  }, [fetchMovies]);

  return [{ state, loading, error }, fetchMovies];
};

export default useHomeFetch;
