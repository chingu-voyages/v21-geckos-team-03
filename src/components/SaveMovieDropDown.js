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
  Link,
  Icon,
  useToast,
  Spinner,
  Tooltip,
} from '@chakra-ui/core';
import { FirebaseContext } from '../firebase';
import useWatchLists from '../hooks/useWatchLists';

function SaveMovieDropDown({ movie, color }) {
  const { user, firebase } = useContext(FirebaseContext);
  const { watchLists } = useWatchLists();
  const [savedMovies, setSavedMovies] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const newMovie = {
    ...movie,
    added: Date.now(),
    watched: false,
  };

  const saveMovie = async (list) => {
    setError(null);
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
        setSavedMovies({ ...savedMovies, [movie.id]: [list.id] });
        toast({
          title: 'Movie added.',
          description: "We've added this to your list",
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setError(null);
        setLoading(false);
      } catch (err) {
        toast({
          title: 'Error adding movie.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
        setError(null);
        setLoading(false);
      }
    } else if (snapshot.exists) {
      setError(true);
      setLoading(false);
      toast({
        title: 'Movie is already on that list.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
    setError(null);
    setLoading(false);
  };
  const Options = () => {
    return watchLists.map((list) => {
      const onList = savedMovies[movie.id]
        ? savedMovies[movie.id].includes(list.id)
        : false;
      return (
        <MenuItem key={list.id} onClick={() => saveMovie(list)}>
          {list.title}
          {loading && <Spinner />}
          {error && <Icon name="warning" color="red.300" ml="5px" />}
          {onList ? (
            <Icon name="check-circle" color="green.300" ml="5px" />
          ) : null}
        </MenuItem>
      );
    });
  };

  return (
    <div>
      <Menu closeOnSelect={false}>
        <MenuButton>
          <Tooltip hasArrow label="Add to List">
            <Icon name="add" color={color} />
          </Tooltip>
        </MenuButton>
        <MenuList placement="right-bottom">
          {user ? (
            <MenuGroup>
              {watchLists && <Options />}
              <MenuDivider />
              <MenuItem as={RouterLink} to="/lists">
                + New List
              </MenuItem>
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
  color: PropTypes.string,
};

SaveMovieDropDown.defaultProps = {
  color: null,
};

export default SaveMovieDropDown;
