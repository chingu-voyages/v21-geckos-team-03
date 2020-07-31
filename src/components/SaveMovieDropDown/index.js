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
  IconButton,
} from '@chakra-ui/core';
import { NavLink } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

function SaveMovieDropDown(props) {
  const { user, firebase } = useContext(FirebaseContext);
  const { movie, watchLists } = props;
  const [savedMovies, setSavedMovies] = useState({}); // format is an object with movie ids as keys, and arrays of lists they are on as values ie {movieA: [listA, listC]}

  const saveMovie = (list) => {
    firebase.db
      .doc(`users/${user.uid}`)
      .collection('lists')
      .doc(list.id)
      .collection('movies')
      .add(movie);
    setSavedMovies({ ...savedMovies, [movie.id]: [list.id] });
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
          <IconButton icon="add" />
        </MenuButton>
        <MenuList>
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
