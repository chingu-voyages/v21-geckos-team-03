import React from 'react';
import PropTypes from 'prop-types';
import { Image, PseudoBox } from '@chakra-ui/core';
import NoImage from '../images/no_image.png';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../utils/config';

const MovieThumb = ({ posterPath, clickable, onClick, small }) => {
  return (
    <>
      <PseudoBox height="100%" _hover={clickable ? { opacity: 0.8 } : null}>
        <Image
          borderRadius="lg"
          roundedRight="0"
          src={
            posterPath
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${posterPath}`
              : NoImage
          }
          maxWidth={
            small
              ? ['50px', '60px', '70px', '80px']
              : ['100%', '100%', '150px', '175px']
          }
          maxHeight={!small ? '100%' : null}
          objectFit="contain"
          alt="movieThumb"
          onClick={clickable ? onClick : null}
        />
      </PseudoBox>
    </>
  );
};

MovieThumb.propTypes = {
  posterPath: PropTypes.string,
  onClick: PropTypes.func,
  clickable: PropTypes.bool,
  small: PropTypes.bool,
};

MovieThumb.defaultProps = {
  clickable: false,
  posterPath: NoImage,
  onClick: null,
  small: false,
};

export default MovieThumb;
