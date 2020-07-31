import React, { useState } from 'react';
import { Stack, Heading, Spinner, Text, Button, Flex } from '@chakra-ui/core';
import { SEARCH_BASE_URL, TRENDING_BASE_URL } from '../utils/config';

import useHomeFetch from '../hooks/useHomeFetch';
import { SearchPanel, MovieCard } from '../components';
// import MovieCard from '../components/MovieCard';

/* 
  Route: "/"
  will contain search movie, movie results components
*/

const Home = () => {
  const [{ state, loading, error }, fetchMovies] = useHomeFetch();
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = (search) => {
    const endpoint = search ? SEARCH_BASE_URL + search : TRENDING_BASE_URL;

    setSearchTerm(search);
    fetchMovies(endpoint);
  };

  const loadMoreMovies = () => {
    const searchEndPoint = `${SEARCH_BASE_URL}${searchTerm}&page=${
      state.currentPage + 1
    }`;

    const trendingEndpoint = `${TRENDING_BASE_URL}&page=${
      state.currentPage + 1
    }`;

    const endpoint = searchTerm ? searchEndPoint : trendingEndpoint;

    fetchMovies(endpoint);
  };

  if (error) return <Text>Something went wrong</Text>;

  return (
    <>
      {!searchTerm && (
        <Heading>Search for movies and add them to a watch list!</Heading>
      )}
      <SearchPanel callback={searchMovies} />
      <Heading>{searchTerm ? 'Search Result' : 'Trending Movies'}</Heading>
      <Stack align="center">
        {loading && <Spinner />}
        {state.movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Stack>
      <Flex align="center" justify="center">
        {state.currentPage < state.totalPages && !loading && (
          <Button type="submit" onClick={loadMoreMovies}>
            Load More
          </Button>
        )}
      </Flex>
    </>
  );
};

export default Home;
