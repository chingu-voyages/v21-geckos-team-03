/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@chakra-ui/core';

function DeleteMovieButton({ movie, list }) {
  const deleteMovie = () => {
    // deleteMovie
  };

  return <IconButton color="red" icon="delete" onClick={deleteMovie} />;
}

DeleteMovieButton.propTypes = {
  movie: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
};

export default DeleteMovieButton;
