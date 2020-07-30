/* eslint-disable react/prop-types */
import React from 'react';
import {
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
} from '@chakra-ui/core';

import { Link, NavLink } from 'react-router-dom';
import EditListModal from '../EditListModal';
import DeleteListModal from '../DeleteListModal';

function EditListDropDown({ list }) {
  return (
    <div>
      <Menu>
        <MenuButton as={Button}>Edit List</MenuButton>
        <MenuList>
          <MenuGroup>
            <EditListModal list={list} />
            <DeleteListModal list={list} />
            <Link as={NavLink} to="#">
              <MenuItem> + New List</MenuItem>
            </Link>
          </MenuGroup>
        </MenuList>
      </Menu>
    </div>
  );
}

export default EditListDropDown;
