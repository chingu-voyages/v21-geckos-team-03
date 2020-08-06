import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Text,
  Link,
  Icon,
  useToast,
  Spinner,
  Tooltip,
} from '@chakra-ui/core';
import { FirebaseContext } from '../firebase';
import useWatchLists from '../hooks/useWatchLists';

function SaveMovieDropDown({ movie }) {
  const { user, firebase } = useContext(FirebaseContext);
  const { watchLists } = useWatchLists();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const toast = useToast();

  const newMovie = {
    ...movie,
    added: Date.now(),
    watched: false,
  };

  const saveMovie = async (list) => {
    setLoading(true);
    const movieRef = await firebase.db
      .doc(`users/${user.uid}`)
      .collection('lists')
      .doc(list.id)
      .collection('movies')
      .doc(`${movie.id}`);

    const snapshot = await movieRef.get();

    if (!snapshot.exists) {
      try {
        await movieRef.set(newMovie);
        setAdded(true);
        setError(null);
        setLoading(false);
        toast({
          title: 'Movie added.',
          description: "We've added this to your list",
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
      } catch (err) {
        setAdded(false);
        setError(err);
        setLoading(false);
        toast({
          title: 'Error adding movie.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    } else if (snapshot.exists) {
      setAdded(false);
      setError(true);
      setLoading(false);
      toast({
        title: 'Movie is already on that list.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const Options = () => {
    return watchLists.map((list) => (
      <MenuItem key={list.id} onClick={() => saveMovie(list)}>
        <Text mr={2}>{list.title}</Text>
        {loading && <Spinner />}
        {added && <Icon name="check-circle" color="green.300" ml="5px" />}
        {error && <Icon name="warning" color="red.300" ml="5px" />}
      </MenuItem>
    ));
  };

  return (
    <div>
      <Menu closeOnSelect={false}>
        <MenuButton>
          <Tooltip hasArrow label="Add to List">
            <Icon name="add" />
          </Tooltip>
        </MenuButton>
        <MenuList placement="right-bottom">
          {user ? (
            <MenuGroup>
              {watchLists && <Options />}
              <MenuDivider />
              <MenuItem> + New List</MenuItem>
            </MenuGroup>
          ) : (
            <MenuGroup>
              <Link as={RouterLink} to="/login">
                <MenuItem>Log In/Sign Up</MenuItem>
              </Link>
            </MenuGroup>
          )}
        </MenuList>
      </Menu>
    </div>
  );
}

SaveMovieDropDown.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default SaveMovieDropDown;
