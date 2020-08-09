import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Text, Box, Icon } from '@chakra-ui/core';
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
      w="100%"
    >
      <Flex
        direction={['row', 'row', 'row']}
        align-items="stretch"
        justify="center"
        p={0}
      >
        <Flex>
          <MovieModal movieId={movie.id} watchLists={watchLists} />
        </Flex>

        <Flex
          p={[0, 0, 6, 6]}
          mx={4}
          w="100%"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Flex flexDir="column">
            <Flex align-self="flex-start" justifyContent="space-between" mb={3}>
              <MovieModal isTitle movieId={movie.id} />
              <SaveMovieDropDown movie={movie} watchLists={watchLists} />
            </Flex>
            <Text fontSize="2xs" mb={3} ml={3}>
              {movie.release_date}
            </Text>
          </Flex>

          <Flex>
            <Text fontSize={['3xs', 'xs', 'sm', 'md']} mb={4} ml={3}>
              {movie.tagline
                ? movie.tagline
                : truncateDescription(movie.overview, 150)}
            </Text>
          </Flex>
          <Flex
            alignSelf="flex-end"
            w="100%"
            ml={3}
            items="center"
            justify="space-between"
            flexDir="row"
          >
            <Flex>
              <Text fontSize="xs" align="center">
                <Icon name="star" size="8px" mb={1} mr={2} />
                {movie.vote_average}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieCard;
