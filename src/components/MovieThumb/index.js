import React from 'react';
import PropTypes from 'prop-types';
import { Image, PseudoBox, Flex } from '@chakra-ui/core';
import NoImage from '../../images/no_image.png';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../utils/config';

const MovieThumb = ({ posterPath, clickable, onClick }) => {
  return (
    <Flex>
      <PseudoBox
        _hover={clickable ? { opacity: 0.8 } : null}
        width="200px"
        height="150px"
      >
        <Image
          src={
            posterPath
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${posterPath}`
              : NoImage
          }
          width="100%"
          objectFit="contain"
          height="100%"
          alt="movieThumb"
          onClick={clickable ? onClick : null}
        />
      </PseudoBox>
    </Flex>
  );
};

MovieThumb.propTypes = {
  posterPath: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  clickable: PropTypes.bool,
};

MovieThumb.defaultProps = {
  clickable: false,
  posterPath: NoImage,
};

export default MovieThumb;
