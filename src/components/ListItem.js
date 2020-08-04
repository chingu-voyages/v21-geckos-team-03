import React, { useContext } from 'react';
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
import { FirebaseContext } from '../firebase';

function ListItem({ data: movie, listDetails: list }) {
  const { firebase, user } = useContext(FirebaseContext);

  function deleteMovieFromList() {
    if (user) {
      try {
        const movieRef = firebase.db
          .doc(`users/${user.uid}`)
          .collection('lists')
          .doc(list.id)
          .collection('movies')
          .doc(`${movie.id}`);

        movieRef.delete().then(() => {
          console.log(`Movie with ID ${movie.id} deleted`);
        });
      } catch (error) {
        console.log('Error deleting movie', error);
      }
    }
  }

  function toggleWatched() {
    if (user) {
      try {
        const movieRef = firebase.db
          .doc(`users/${user.uid}`)
          .collection('lists')
          .doc(list.id)
          .collection('movies')
          .doc(`${movie.id}`);

        movieRef.get().then((doc) => {
          if (doc.exists) {
            const prevState = doc.data().watched;
            movieRef.update({ watched: !prevState });
          }
        });
      } catch (error) {
        console.log('Error updating document', error);
      }
    }
  }
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
        <Checkbox
          size="lg"
          mr={[4, 6, 8, 10]}
          isChecked={movie.watched}
          onClick={toggleWatched}
        />
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
        onClick={deleteMovieFromList}
        justifySelf="flex-end"
        aria-label="delete movie"
        size={['xs', 'xs', 'sm', 'md']}
        icon="delete"
      />
    </Flex>
  );
}

ListItem.propTypes = {
  data: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  listDetails: PropTypes.object,
};

export default ListItem;
