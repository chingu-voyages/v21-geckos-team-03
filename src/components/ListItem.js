/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  Text,
  Box,
  Icon,
  Tag,
  Checkbox,
  TagLabel,
} from '@chakra-ui/core';
// import useWatchLists from '../../hooks/useWatchLists';
// import { MovieThumb } from '../components';
// import { formatDateYear } from '../utils';

function ListItem({ movie }) {
  // const { watchLists } = useWatchLists();

  return (
    <Flex
      p={4}
      my={4}
      borderBottom="1px"
      borderStyle="solid"
      // borderRadius="lg"
      borderColor="gray.200"
      position="relative"
      // justify={{ base: 'space-around', lg: 'space-between' }}
      align="center"
      justify="space-around"
    >
      <Icon name="drag-handle" mr={4} />
      {/* <MovieThumb /> */}
      <Flex width="30%">
        <Text fontSize="md" mr={4} mb={1} width="100%">
          {movie.title}
        </Text>
      </Flex>
      <Flex align="center">
        <Box width="33%">
          <Tag size="sm" rounded="full" mr={4}>
            <TagLabel fontSize="xs">Genre</TagLabel>
          </Tag>
        </Box>

        <Flex width="33%">
          {/* <Text fontSize="3xs">{formatDateYear(movie.release_date)}</Text> */}
          <Icon name="star" size="8px" mr={2} />
          <Text fontSize="2xs">{movie.vote_average}</Text>
        </Flex>
        <Text
          width="33%"
          display={{ base: 'none', sm: 'flex' }}
          fontSize="xs"
          // mr={10}
        >
          July 30th, 2020
        </Text>
      </Flex>

      <Checkbox size="lg" ml={6} mr={4} />
    </Flex>
  );
}

ListItem.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default ListItem;
