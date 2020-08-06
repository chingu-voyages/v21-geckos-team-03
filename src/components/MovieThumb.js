import React from 'react';
import PropTypes from 'prop-types';
import { Image, PseudoBox, Flex } from '@chakra-ui/core';
import NoImage from '../images/no_image.png';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../utils/config';

const MovieThumb = ({ posterPath, clickable, onClick, small }) => {
  return (
    <Flex>
      <PseudoBox _hover={clickable ? { opacity: 0.8 } : null}>
        <Image
          src={
            posterPath
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${posterPath}`
              : NoImage
          }
          maxWidth={small ? ['50px', '60px', '75px', '85px'] : '100%'}
          objectFit="contain"
          alt="movieThumb"
          onClick={clickable ? onClick : null}
        />
      </PseudoBox>
    </Flex>
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
