import React from 'react';
import PropTypes from 'prop-types';
import useFetchLists from '../../hooks/useFetchLists';
import MovieCard from '../MovieCard';

// displays a list of movies passed in as props

function Movies({ movies }) {
  const userLists = useFetchLists();

  const generateResultCards = () => {
    return movies
      .filter((movie) => movie.poster_path)
      .map((movie) => (
        <MovieCard movie={movie} key={movie.id} userLists={userLists} />
      ));
  };
  return <div className="cardList">{generateResultCards()}</div>;
}

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Movies;
