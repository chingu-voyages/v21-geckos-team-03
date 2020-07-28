/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Heading, Text, Box } from '@chakra-ui/core';
import ListDropDown from '../ListDropDown';
import useFetchLists from '../../hooks/useFetchLists';
import SimpleBox from '../SimpleBox';
import MovieThumb from '../MovieThumb';

function MovieCard({ image, movieId, movie }) {
  const userLists = useFetchLists();

  return (
    <SimpleBox>
      <Flex align="center" justify="flex-start">
        <MovieThumb image={image} movieId={movieId} clickable />
        <Box>
          <Flex align="center" justify="space-between">
            <Heading className="card--title">{movie.title}</Heading>
            <ListDropDown movie={movie} userLists={userLists} />
          </Flex>
          <Text>
            RELEASE DATE:
            {movie.release_date}
          </Text>
          <Text>
            RATING:
            {movie.vote_average}
          </Text>
          <p className="card--desc">{movie.overview}</p>
        </Box>
      </Flex>
    </SimpleBox>
  );
}

MovieCard.propTypes = {
  image: PropTypes.string.isRequired,
  movie: PropTypes.object.isRequired,
  movieId: PropTypes.number.isRequired,
};

export default MovieCard;
