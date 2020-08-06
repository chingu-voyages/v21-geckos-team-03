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
      w="100%"
      // p={4}
      mb={6}
      border="1px"
      borderRadius="md"
      borderColor="gray.200"
      bg="gray.800"
      // onClick={onClick}
      shadow="md"
    >
      <Flex
        direction={['column', 'column', 'row', 'row']}
        align={['center', 'flex-start']}
        justify="center"
      >
        <Box pb={[10, 8, 0]}>
          <MovieModal movie={movie} watchLists={watchLists} />
        </Box>

        <Box px={[2, 4]}>
          <Flex align="center" justify="space-between">
            <Heading as="h2" fontSize={['lg', 'xl', '2xl']} mb={2}>
              {movie.title}
            </Heading>
            <SaveMovieDropDown movie={movie} watchLists={watchLists} />
          </Flex>
          <Text fontSize="xs">{movie.release_date}</Text>
          <Text fontSize="xs">
            RATING:
            {movie.vote_average}
          </Text>
          <Text fontSize={['3xs', 'sm', 'md']}>
            {truncateDescription(movie.overview, 200)}
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
