/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Text, Box, Icon, Tag, Checkbox } from '@chakra-ui/core';
// import useWatchLists from '../../hooks/useWatchLists';
import SimpleBox from '../SimpleBox';
// import MovieThumb from '../MovieThumb';
import { formatDateYear } from '../../utils';

function ListItem({ movie }) {
  // const { watchLists } = useWatchLists();

  return (
    <SimpleBox>
      <Flex align="center" justify="space-between">
        <Flex align="center" justify="space-between">
          <Box
            background="black"
            mr={6}
            size="80px"
            objectFit="contain"
            rounded="full"
          />
          <Box>
            <Flex align="center">
              <Text fontSize="2xl" mr={2}>
                {movie.title}
              </Text>
              <Text fontSize="xs">{formatDateYear(movie.release_date)}</Text>
            </Flex>
            <Text fontSize="xs">
              <Icon name="star" />
              {movie.vote_average}
            </Text>
          </Box>
        </Flex>

        <Flex align="center">
          <Tag size="md" mr={8}>
            Genre
          </Tag>
          <Icon name="time" mr={1} />
          <Text fontSize="xs" mr={10}>
            July 30th, 2020
          </Text>
          <Checkbox size="lg" />
        </Flex>
        <Icon alignSelf="end" name="delete" />
      </Flex>
    </SimpleBox>
  );
}

ListItem.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default ListItem;
