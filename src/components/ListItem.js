import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  Text,
  Icon,
  PseudoBox,
  IconButton,
  Tooltip,
  useToast,
  Collapse,
  Select,
  FormControl,
} from '@chakra-ui/core';
import MovieModal from './MovieModal';
// import { formatDate } from '../utils';
import { FirebaseContext } from '../firebase';
import useWatchLists from '../hooks/useWatchLists';

function ListItem({ data: movie, listDetails: list }) {
  const { firebase, user } = useContext(FirebaseContext);
  const { watchLists } = useWatchLists();
  const toast = useToast();
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

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
          toast({
            title: 'Movie deleted',
            status: 'success',
            duration: 1000,
            isClosable: false,
          });
        });
      } catch (error) {
        console.log('Error deleting movie', error);
        toast({
          title: 'Something went wrong',
          description: error,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    }
  }

  function toggleWatched(e) {
    const watched = e.target.value === 'watched';
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
            movieRef.update({ watched });
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
        {/* Modal is in the image Container  */}
        <PseudoBox mr={4}>
          <MovieModal isListItem movieId={movie.id} watchLists={watchLists} />
        </PseudoBox>
        {/* Title & Rating */}
        <Flex direction="column" mr={1}>
          <MovieModal isListItemTitle movieId={movie.id} />
          <Flex flexDir="row" align="center">
            <Flex>
              <Icon name="star" size="8px" mr={2} />
              <Text fontSize="2xs">{movie.vote_average}</Text>
            </Flex>
            <Flex>
              <IconButton
                icon="chevron-down"
                variant="ghost"
                onClick={handleToggle}
                size="xs"
              />
            </Flex>
          </Flex>
          <Collapse isOpen={show} startingHeight={0} ml={1}>
            <Text fontSize="2xs">{movie.overview}</Text>
          </Collapse>
        </Flex>
      </Flex>
      {/* <Text fontSize="xs">{formatDate(movie.added)}</Text> */}
      <Flex flexDir="column">
        <Tooltip hasArrow label="Delete Movie" placement="left">
          <IconButton
            onClick={deleteMovieFromList}
            justifySelf="flex-end"
            aria-label="delete movie"
            size={['xs', 'xs', 'sm', 'md']}
            icon="delete"
            variant="ghost"
          />
        </Tooltip>
        {/* Check to mark watched */}
        <FormControl>
          <Select
            id="watched?"
            size="sm"
            mt={5}
            onChange={toggleWatched}
            variant="unstyled"
            defaultValue={movie.watched ? 'watched' : 'unwatched'}
          >
            <option value="watched">Watched</option>
            <option value="unwatched">Unwatched</option>
          </Select>
        </FormControl>
      </Flex>
    </Flex>
  );
}

ListItem.propTypes = {
  data: PropTypes.object.isRequired,
  listDetails: PropTypes.object.isRequired,
};

export default ListItem;
