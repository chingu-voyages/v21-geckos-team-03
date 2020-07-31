/* eslint-disable react/forbid-prop-types */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@chakra-ui/core';
import { FirebaseContext } from '../firebase';

function DeleteMovieButton({ movie, list }) {
  const { user, firebase } = useContext(FirebaseContext);
  const deleteMovie = () => {
    firebase.db
      .doc(`users/${user.uid}`)
      .collection('lists')
      .doc(list.id)
      .collection('movies')
      .doc(`${movie.id}`)
      .delete()
      .then(function () {
        console.log('Document successfully deleted!');
      })
      .catch(function (error) {
        console.error('Error removing document: ', error);
      });
  };

  return <IconButton color="red" icon="delete" onClick={deleteMovie} />;
}

DeleteMovieButton.propTypes = {
  movie: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
};

export default DeleteMovieButton;
