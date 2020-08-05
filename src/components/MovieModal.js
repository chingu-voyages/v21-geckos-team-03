import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/core';
import MovieThumb from './MovieThumb';
import SaveMovieDropDown from './SaveMovieDropDown';

const MovieModal = ({ movie, watchLists, isListItem }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MovieThumb
        posterPath={movie.poster_path}
        movieId={movie.id}
        clickable
        onClick={onOpen}
        small={isListItem}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{movie.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!isListItem && (
              <SaveMovieDropDown movie={movie} watchLists={watchLists} />
            )}
            <MovieThumb
              posterPath={movie.poster_path}
              movieId={movie.id}
              clickable={false}
              onClick={null}
            />
            {movie.overview}
          </ModalBody>

          {/* <ModalFooter></ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

MovieModal.propTypes = {
  movie: PropTypes.object.isRequired,
  watchLists: PropTypes.arrayOf(PropTypes.object).isRequired,
  isListItem: PropTypes.bool,
};

MovieModal.defaultProps = {
  isListItem: false,
};

export default MovieModal;
