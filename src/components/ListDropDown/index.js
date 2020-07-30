/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import {
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Link,
} from '@chakra-ui/core';
import { NavLink } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

/* 
  Renders a single movie passed in as a prop
*/

function ListDropDown(props) {
  const { user, firebase } = useContext(FirebaseContext);
  const { movie, watchLists } = props;

  console.log(watchLists);

  const saveMovie = (list) => {
    firebase.db
      .doc(`users/${user.uid}`)
      .collection('lists')
      .doc(list.id)
      .collection('movies')
      .add(movie);
    console.log('saving movie to list', movie, list);
  };

  const generateLists = () => {
    // generates list names for the dropdown
    if (!watchLists) {
      return [];
    }
    let i = 0;
    const options = watchLists.map((list) => {
      i += 1;
      return (
        <MenuItem key={`${i}-${list.title}`} onClick={() => saveMovie(list)}>
          {list.title}
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
