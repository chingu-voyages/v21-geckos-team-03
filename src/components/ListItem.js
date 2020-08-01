/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Text, Icon, Tag, Checkbox, TagLabel } from '@chakra-ui/core';
// import useWatchLists from '../../hooks/useWatchLists';
// import MovieThumb from '../MovieThumb';
// import { formatDateYear } from '../utils';

function ListItem({ movie }) {
  // const { watchLists } = useWatchLists();

  return (
    <Flex
      p={[2, 4, 4, 6]}
      my={4}
      borderBottom="1px"
      borderStyle="solid"
      // borderRadius="lg"
      borderColor="gray.200"
      position="relative"
      justify={{ base: 'space-around', lg: 'space-between' }}
      align="center"
      // justify="space-between"
    >
      <Icon name="drag-handle" mr={2} />
      <Icon position="absolute" top="2" right="2" size="6px" name="close" />

      <Flex direction={['column', 'row', 'row']}>
        <Text fontSize="md" mr={4} mb={1}>
          {movie.title}
        </Text>
        <Flex align="center">
          <Tag size="sm" rounded="full" mr={4}>
            <TagLabel fontSize="xs">Genre</TagLabel>
          </Tag>
          <Flex align="center">
            {/* <Text fontSize="3xs">{formatDateYear(movie.release_date)}</Text> */}
            <Icon name="star" size="8px" mr={2} />
            <Text fontSize="2xs">{movie.vote_average}</Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        display={{ base: 'none', md: 'flex' }}
        justifySelf="flex-end"
        align="center"
      >
        <Text fontSize="xs" mr={10}>
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
