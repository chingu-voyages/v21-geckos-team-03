import React from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  Text,
  Icon,
  PseudoBox,
  Image,
  Checkbox,
  IconButton,
} from '@chakra-ui/core';

import NoImage from '../images/no_image.png';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../utils/config';

function ListItem({ movie }) {
  return (
    <Flex
      p={4}
      my={4}
      mx={0}
      borderBottom="1px"
      borderStyle="solid"
      borderColor="gray.200"
      position="relative"
      align="center"
      justify="space-between"
    >
      <Flex align="center">
        {/* Check to mark watched */}
        <Checkbox size="lg" mr={[4, 6, 8, 10]} />
        {/* Image Container */}
        <PseudoBox size={['50px', '60px', '75px', '85px']} mr={4}>
          <Image
            justifySelf="start"
            rounded="md"
            src={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : NoImage
            }
            objectFit="contain"
            height="100%"
            alt="movieThumb"
          />
        </PseudoBox>
        {/* Title & Rating */}
        <Flex direction="column" mr={1}>
          <Text fontSize={['md', 'md', 'lg']} mr={4} mb={1}>
            {movie.title}
          </Text>
          <Flex>
            <Icon name="star" size="8px" mr={2} />
            <Text fontSize="2xs">{movie.vote_average}</Text>
          </Flex>
        </Flex>
      </Flex>

      <IconButton
        justifySelf="flex-end"
        aria-label="delete movie"
        size={['xs', 'xs', 'sm', 'md']}
        icon="delete"
      />
    </Flex>
  );
}

ListItem.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default ListItem;
