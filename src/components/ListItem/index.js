/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Heading, Text, Box } from '@chakra-ui/core';
import SaveMovieDropDown from '../SaveMovieDropDown';
import useWatchLists from '../../hooks/useWatchLists';
import SimpleBox from '../SimpleBox';
import MovieThumb from '../MovieThumb';

function ListItem({ movie }) {
  const { watchLists } = useWatchLists();

  return (
    <SimpleBox>
      <Flex align="center" justify="flex-start">
        <MovieThumb
          posterPath={movie.poster_path}
          movieId={movie.id}
          clickable
        />
        <Box>
          <Flex align="center" justify="space-between">
            <Heading as="h3">{movie.title}</Heading>
            <SaveMovieDropDown movie={movie} watchLists={watchLists} />
          </Flex>
          <Text fontSize="xs">
            RELEASE DATE:
            {movie.release_date}
          </Text>
          <Text fontSize="xs">
            RATING:
            {movie.vote_average}
          </Text>
          <Text fontSize="sm">{movie.overview}</Text>
        </Box>
      </Flex>
    </SimpleBox>
  );
}

ListItem.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default ListItem;
