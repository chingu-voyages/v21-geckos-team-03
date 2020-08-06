import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Heading, Text, Box } from '@chakra-ui/core';
import MovieModal from './MovieModal';
import SaveMovieDropDown from './SaveMovieDropDown';
import useWatchLists from '../hooks/useWatchLists';
import SimpleBox from './SimpleBox';
import { truncateDescription } from '../utils';

function MovieCard({ movie }) {
  const { watchLists } = useWatchLists();

  return (
    <SimpleBox>
      <Flex
        direction={['column', 'row', 'row', 'row']}
        align={['center', 'flex-start']}
        justify="flex-start"
      >
        <MovieModal movie={movie} watchLists={watchLists} />
        <Box px={[2, 4]}>
          <Flex align="center" justify="space-between">
            <Heading as="h3" fontSize={['md', 'xl', '2xl']} mb={2}>
              {movie.title}
            </Heading>
            <SaveMovieDropDown movie={movie} watchLists={watchLists} />
          </Flex>
          <Text fontSize="xs">{movie.release_date}</Text>
          <Text fontSize="xs">
            RATING:
            {movie.vote_average}
          </Text>
          <Text fontSize="sm">{truncateDescription(movie.overview, 200)}</Text>
        </Box>
      </Flex>
    </SimpleBox>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieCard;
