import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Image, PseudoBox, Flex, Link } from '@chakra-ui/core';
import NoImage from '../../images/no_image.png';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../utils/config';

const MovieThumb = ({ posterPath, movieId, clickable }) => {
  const MovieImage = () => (
    <Image
      src={
        posterPath ? `${IMAGE_BASE_URL}${POSTER_SIZE}${posterPath}` : NoImage
      }
      width="100%"
      objectFit="contain"
      height="100%"
      alt="movieThumb"
    />
  );

  return (
    <Flex>
      <PseudoBox _hover={{ opacity: 0.8 }} width="200px" height="150px">
        {clickable ? (
          <Link as={RouterLink} to={`/movie/${movieId}`} cursor="pointer">
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
  posterPath: PropTypes.string,
  movieId: PropTypes.number.isRequired,
  clickable: PropTypes.bool,
};

MovieThumb.defaultProps = {
  clickable: false,
  posterPath: NoImage,
};

export default MovieThumb;
