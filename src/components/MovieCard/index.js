/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Image, Flex, Heading, Text, Box } from '@chakra-ui/core';
import ListDropDown from '../ListDropDown';
import useFetchLists from '../../hooks/useFetchLists';
import SimpleBox from '../SimpleBox';

/* 
  Renders a single movie passed in as a prop
*/

// eslint-disable-next-line react/prop-types
function MovieCard({ image, movieId, movie }) {
  const userLists = useFetchLists();
  // console.log('movie', movie);
  return (
    <SimpleBox>
      <Flex className="card--content">
        <Image width="auto" height="200px" src={image} alt={movie.title} />
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
};

export default MovieCard;
