import React from 'react';
import { Heading, Image, Text, Flex } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../utils/config';
import NoImage from '../images/no_image.png';

const ActorCard = ({ actor }) => {
  return (
    <Flex
      direction="column"
      borderColor="gray.200"
      borderWidth="1px"
      borderStyle="solid"
      textAlign="center"
      borderRadius="20px"
      shadow="md"
      width="200px"
      m={2}
    >
      <Image
        height="200px"
        objectFit="cover"
        borderRadius="15px"
        roundedBottom="0"
        src={
          actor.profile_path
            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
            : NoImage
        }
      />
      <Flex direction="column" flexWrap="wrap" p={2} mx={5}>
        <Heading fontSize="md">{actor.name}</Heading>
        <Text wordBreak="break-word">{actor.character}</Text>
      </Flex>
    </Flex>
  );
};

ActorCard.propTypes = {
  actor: PropTypes.object.isRequired,
};

export default ActorCard;
