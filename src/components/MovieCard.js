import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Heading, Text, Box } from '@chakra-ui/core';
import MovieModal from './MovieModal';
import SaveMovieDropDown from './SaveMovieDropDown';
import useWatchLists from '../hooks/useWatchLists';
import { truncateDescription } from '../utils';

function MovieCard({ movie }) {
  const { watchLists } = useWatchLists();

  return (
    <Box
      mb={6}
      border="1px"
      borderRadius="lg"
      borderColor="gray.200"
      shadow="md"
      p={0}
    >
      <Flex
        direction={['row', 'row', 'row']}
        align="center"
        justify="center"
        p={0}
      >
        <Box>
          <MovieModal movieId={movie.id} watchLists={watchLists} />
        </Box>

        <Box p={[0, 0, 6, 6]} mx={4}>
          <Flex align="center" justify="space-between" mb={3}>
            <Heading as="h2" fontSize={['xl', '2xl', '3xl']}>
              {movie.title}
            </Heading>
            <SaveMovieDropDown movie={movie} watchLists={watchLists} />
          </Flex>
          <Text fontSize="2xs" mb={3}>
            {movie.release_date}
          </Text>
          <Text fontSize={['3xs', 'xs', 'sm', 'md']} mb={4}>
            {truncateDescription(movie.overview, 150)}
          </Text>
          <Text fontSize="xs">
            RATING:
            {movie.vote_average}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieCard;
