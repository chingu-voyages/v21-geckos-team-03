import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalOverlay,
  Box,
  Text,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Heading,
  Flex,
  Spinner,
} from '@chakra-ui/core';
import MovieThumb from './MovieThumb';
import SaveMovieDropDown from './SaveMovieDropDown';
import ActorCard from './ActorCard';
import useMovieFetch from '../hooks/useMovieFetch';
import { IMAGE_BASE_URL, BACKDROP_SIZE } from '../utils/config';

const MovieModal = ({ movieId, watchLists, isListItem }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [movie, loading, error] = useMovieFetch(movieId);

  if (loading) return <Spinner />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <>
      <MovieThumb
        posterPath={movie.poster_path}
        movieId={movie.id}
        clickable
        onClick={onOpen}
        small={isListItem}
      />

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex align="center">
              <Heading mr={2} fontSize="2xl">
                {movie.title}
              </Heading>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              <Box
                background={
                  movie.backdrop_path
                    ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}')`
                    : '#000'
                }
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                width="100%"
                px={10}
                py={10}
                mb={4}
              >
                <Flex
                  mx={0}
                  my="auto"
                  bg="rgb(0, 0, 0, 0.7)"
                  borderRadius="20px"
                >
                  <Box p={8}>
                    <Heading>{movie.original_title}</Heading>
                    <Flex>
                      <Heading fontSize="lg" mr={2}>
                        Directed by:
                      </Heading>
                      {movie.directors &&
                        movie.directors.map((dir) => (
                          <Text key={dir.credit_id}>{dir.name}</Text>
                        ))}
                    </Flex>
                    <Text mb={4}>Rating : {movie.vote_average}</Text>
                    <Text mb={4}>{movie.overview}</Text>
                    {!isListItem && (
                      <Flex>
                        <Text mr={2}>Add to list:</Text>
                        <SaveMovieDropDown
                          movie={movie}
                          watchLists={watchLists}
                        />
                      </Flex>
                    )}
                  </Box>
                </Flex>
              </Box>
              <Box>
                <Heading as="h3" fontSize="2xl">
                  Actors
                </Heading>
              </Box>
              <Box>
                <Flex flexWrap="wrap" justifyContent="space-around">
                  {movie.actors &&
                    movie.actors.map((actor) => (
                      <ActorCard key={actor.credit_id} actor={actor} />
                    ))}
                </Flex>
              </Box>
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

MovieModal.propTypes = {
  movieId: PropTypes.number.isRequired,
  watchLists: PropTypes.arrayOf(PropTypes.object).isRequired,
  isListItem: PropTypes.bool,
};

MovieModal.defaultProps = {
  isListItem: false,
};

export default MovieModal;
