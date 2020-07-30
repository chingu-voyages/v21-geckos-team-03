import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/core';
import MovieCard from '../MovieCard';
import useWatchLists from '../../hooks/useWatchLists';

// displays a list of movies passed in as props

function Movies({ movies }) {
  const { watchLists, loading, error } = useWatchLists();

  const generateResultCards = () => {
    return movies
      .filter((movie) => movie.poster_path)
      .map((movie, i) => (
        <MovieCard movie={movie} key={movie.id} userLists={watchLists} />
      ));
  };
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading </Text>;

  return <div className="cardList">{generateResultCards()}</div>;
}

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Movies;
