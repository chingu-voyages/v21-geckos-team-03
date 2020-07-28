import React, { useState } from 'react';
import { Stack, Heading, Spinner, Text, Button, Flex } from '@chakra-ui/core';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../utils/config';

import useHomeFetch from '../hooks/useHomeFetch';

// import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import NoImage from '../images/no_image.png';
import MovieCard from '../components/MovieCard';

/* 
  Route: "/"
  will contain search movie, movie results components
*/

const Home = (props) => {
  const [{ state, loading, error }, fetchMovies] = useHomeFetch();
  // eslint-disable-next-line no-unused-vars
  const [searchTerm, setSearchTerm] = useState('');

  console.log(state);

  const loadMoreMovies = () => {
    const searchEndPoint = `${API_URL}search/movie/?api_key=${API_KEY}&query=${searchTerm}&page=${
      state.currentPage + 1
    }`;

    const trendingEndpoint = `${API_URL}trending/movie/week?api_key=${API_KEY}&page=${
      state.currentPage + 1
    }`;

    const endpoint = searchTerm ? searchEndPoint : trendingEndpoint;

    fetchMovies(endpoint);
  };

  if (error) return <Text>Something went wrong</Text>;

  return (
    <>
      <SearchBar />
      <Heading>{searchTerm ? 'Search Result' : 'Trending Movies'}</Heading>
      <Stack>
        {loading && <Spinner />}
        {state.movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movieId={movie.id}
            movie={movie}
            image={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : NoImage
            }
          />
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

Home.propTypes = {};

export default Home;
