import React, { useState } from 'react';
import {
  Stack,
  Heading,
  Spinner,
  Text,
  Button,
  Flex,
  Box,
  Divider,
} from '@chakra-ui/core';

import { SEARCH_BASE_URL, TRENDING_BASE_URL } from '../utils/config';
import useHomeFetch from '../hooks/useHomeFetch';
import { SearchPanel, MovieCard } from '../components';

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
        <Heading textAlign="center" mx="auto" my={12} maxWidth="600px">
          Search for movies and add them to a watch list!
        </Heading>
      )}
      <Box mb={12}>
        <SearchPanel callback={searchMovies} />
      </Box>
      <Box maxWidth="800px" mx="auto" my={0}>
        <Heading fontSize="2xl">
          {searchTerm ? 'Search Results' : 'Trending Movies'}
        </Heading>
        <Divider mb={8} />
        <Stack align="center">
          {loading && (
            <Box>
              <Spinner size="xl" />
            </Box>
          )}
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
      </Box>
    </>
  );
};

export default Home;
