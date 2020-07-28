import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, PseudoBox, Flex } from '@chakra-ui/core';

const MovieThumb = ({ image, movieId, clickable }) => {
  const MovieImage = () => (
    <Image
      src={image}
      width="100%"
      objectFit="contain"
      height="100%"
      alt="movieThumb"
    />
  );

  return (
    <Flex>
      <PseudoBox _hover={{ opacity: 0.8 }} width="200px" height="200px">
        {clickable ? (
          <Link to={`/${movieId}`} cursor="pointer">
            <MovieImage />
          </Link>
        ) : (
          <MovieImage />
        )}
      </PseudoBox>
    </Flex>
  );
};

MovieThumb.propTypes = {
  image: PropTypes.string.isRequired,
  movieId: PropTypes.number.isRequired,
  clickable: PropTypes.bool,
};

MovieThumb.defaultProps = {
  clickable: false,
};

export default MovieThumb;
