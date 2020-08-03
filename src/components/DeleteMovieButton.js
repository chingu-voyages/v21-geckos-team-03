/* eslint-disable react/forbid-prop-types */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@chakra-ui/core';
import { FirebaseContext } from '../firebase';

function DeleteMovieButton({ movie, list, setDeleted }) {
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
        setDeleted(true);
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
  setDeleted: PropTypes.func.isRequired,
};

export default DeleteMovieButton;
