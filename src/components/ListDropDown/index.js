/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import {
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Link,
  Icon,
} from '@chakra-ui/core';
import { NavLink } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

/* 
  Renders a single movie passed in as a prop
*/

function ListDropDown({ movie, watchLists }) {
  const { user, firebase } = useContext(FirebaseContext);
  const [savedMovies, setSavedMovies] = useState({}); // format is an object with movie ids as keys, and arrays of lists they are on as values ie {movieA: [listA, listC]}

  const saveMovie = (list) => {
    firebase.db
      .doc(`users/${user.uid}`)
      .collection('lists')
      .doc(list.id)
      .collection('movies')
      .doc(`${movie.id}`)
      .set(movie)
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
        setSavedMovies({ ...savedMovies, [movie.id]: [list.id] });
      });
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
          {onList ? <Icon name="check-circle" color="green" ml="5px" /> : null}
        </MenuItem>
      );
    });
    return options;
  };

  return (
    <div>
      <Menu>
        <MenuButton as={Button}>Save to List</MenuButton>
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

export default ListDropDown;
