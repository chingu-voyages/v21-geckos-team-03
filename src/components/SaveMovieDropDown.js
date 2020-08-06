/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Link,
  Icon,
  Tooltip,
} from '@chakra-ui/core';
import { NavLink } from 'react-router-dom';
import { FirebaseContext } from '../firebase';

function SaveMovieDropDown(props) {
  const { user, firebase } = useContext(FirebaseContext);
  const { movie, watchLists } = props;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState({}); // format is an object with movie ids as keys, and arrays of lists they are on as values ie {movieA: [listA, listC]}

  const saveMovie = async (list) => {
    const newMovie = {
      ...movie,
      added: Date.now(),
      watched: false,
    };

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
        setError(null);
        setLoading(false);
        console.log('movie added');
      } catch (err) {
        setError(err);
        setLoading(false);
        console.log(`Error adding movie`);
      }
    } else if (snapshot.exists) {
      setError(true);
      setLoading(false);
      console.log('movie already exists');
    }
  };

  const generateLists = () => {
    // generates list names for the dropdown
    if (!watchLists) {
      return [];
    }
    let i = 0;
    const options = watchLists.map((list) => {
      i += 1;
      const onList = savedMovies[movie.id]
        ? savedMovies[movie.id].includes(list.id)
        : false;
      return (
        <MenuItem key={`${i}-${list.title}`} onClick={() => saveMovie(list)}>
          {list.title}
          {onList ? (
            <Icon name="check-circle" color="green.300" ml="5px" />
          ) : null}
        </MenuItem>
      );
    });
    return options;
  };

  return (
    <div>
      <Menu>
        <MenuButton>
          <Tooltip hasArrow label="Add to List">
            <Icon name="add" />
          </Tooltip>
        </MenuButton>
        <MenuList placement="right-bottom">
          {user ? (
            <MenuGroup>
              {generateLists()}
              <MenuDivider />
              <MenuItem> + New List</MenuItem>
            </MenuGroup>
          ) : (
            <MenuGroup>
              <Link as={NavLink} to="/login">
                <MenuItem>Log In/Sign Up</MenuItem>
              </Link>
            </MenuGroup>
          )}
        </MenuList>
      </Menu>
    </div>
  );
}

export default SaveMovieDropDown;
