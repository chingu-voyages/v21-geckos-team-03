/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/core';
import MovieThumb from '../components/MovieThumb';
import ListDropDown from '../components/ListDropDown';

/* 
  Will contain components for rendering data about a single movie fetched from API
*/

const MovieModal = ({ movie, watchLists }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <MovieThumb
        posterPath={movie.poster_path}
        movieId={movie.id}
        clickable
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{movie.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MovieThumb
              posterPath={movie.poster_path}
              movieId={movie.id}
              clickable={false}
              onClick={null}
            />
            {movie.overview}
          </ModalBody>

          <ModalFooter>
            <ListDropDown movie={movie} watchLists={watchLists} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

MovieModal.propTypes = {
  movie: PropTypes.object.isRequired,
  watchLists: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieModal;
