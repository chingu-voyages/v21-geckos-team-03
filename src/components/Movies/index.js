/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import useFetchLists from '../../hooks/useFetchLists';
import MovieCard from '../MovieCard';

// the portion of the page containing all the search results.

function Movies({ movies }) {
  const userLists = useFetchLists();

  const generateResultCards = (results) => {
    movies
      .filter((movie) => movie.poster_path)
      .map((movie) => (
        <MovieCard movie={movie} key={movie.id} userLists={userLists} />
      ));
  };
  return <div className="cardList">{generateResultCards()}</div>;
}

Movies.propTypes = {
  movies: PropTypes.node.isRequired,
};

export default Movies;
