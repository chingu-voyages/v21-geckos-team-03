import React, { useState } from 'react';
import { Stack, Heading, Spinner, Text } from '@chakra-ui/core';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../utils/config';

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
  const [{ state, loading, error }] = useHomeFetch();
  // eslint-disable-next-line no-unused-vars
  const [searchTerm, setSearchTerm] = useState('');

  console.log(state);

  if (loading) return <Spinner />;
  if (error) return <Text>Something went wrong</Text>;

  return (
    <>
      <SearchBar />
      <Heading>{searchTerm ? 'Search Result' : 'Trending Movies'}</Heading>
      <Stack>
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
    </>
  );
};

Home.propTypes = {};

export default Home;
