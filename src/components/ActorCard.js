import React from 'react';
import { Box, Image, Text } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../utils/config';
import NoImage from '../images/no_image.png';

const ActorCard = ({ actor }) => {
  return (
    <Box
      borderColor="gray.200"
      borderWidth="1px"
      borderStyle="solid"
      textAlign="center"
      borderRadius="20px"
      p={1}
      minWidth="150px"
      m={2}
    >
      <Image
        height="200px"
        objectFit="cover"
        borderRadius="15px"
        maxWidth="150px"
        mx="auto"
        my={0}
        src={
          actor.profile_path
            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
            : NoImage
        }
      />
      <Text>{actor.name}</Text>
      <Text>{actor.character}</Text>
    </Box>
  );
};

ActorCard.propTypes = {
  actor: PropTypes.object.isRequired,
};

export default ActorCard;
