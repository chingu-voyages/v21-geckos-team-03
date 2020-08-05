import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  Text,
  Icon,
  PseudoBox,
  Checkbox,
  IconButton,
} from '@chakra-ui/core';
import MovieModal from './MovieModal';
import { formatDate } from '../utils';
import { FirebaseContext } from '../firebase';
import useWatchLists from '../hooks/useWatchLists';

function ListItem({ data: movie, listDetails: list }) {
  const { firebase, user } = useContext(FirebaseContext);
  const { watchLists } = useWatchLists();

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
            console.log(`Movie with id ${movie.id} updated`);
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
          onChange={toggleWatched}
        />
        {/* Modal is in the image Container  */}
        <PseudoBox mr={4}>
          <MovieModal isListItem movie={movie} watchLists={watchLists} />
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

      <Text fontSize="xs">{formatDate(movie.added)}</Text>
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
  listDetails: PropTypes.object.isRequired,
};

export default ListItem;
