import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Heading,
  Flex,
  Text,
  Button,
  Link,
  Icon,
  useColorMode,
  Image,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from '@chakra-ui/core';
import Film from '../images/film.png';

import { FirebaseContext } from '../firebase';

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

MenuItems.propTypes = {
  children: PropTypes.node.isRequired,
};

function NavBar() {
  const { user, firebase } = useContext(FirebaseContext);
  const [show, setShow] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const history = useHistory();
  const handleToggle = () => setShow(!show);

  function handleLogout() {
    firebase.logout();
    history.push('/login');
  }

  return (
    <Flex
      bg={colorMode === 'light' ? 'white' : '#1A202C'}
      as="nav"
      align="center"
      justify={['center', 'space-between', 'space-between', 'space-between']}
      wrap="wrap"
      p={6}
      mb={10}
      borderBottom="1px solid #C8C8C8"
      flexDir={['column', 'row', 'row', 'row']}
      // position="fixed"
      // overflow="hidden"
      // top={0}
      width="100%"
      zIndex={100}
    >
      <Flex
        align="center"
        justify="left"
        mr={5}
        flexDir={['column', 'row', 'row', 'row']}
        justifyItems={{ sm: 'center' }}
        m={{ sm: 'auto' }}
      >
        <Link as={NavLink} to="/">
          <Image
            src={Film}
            alt="A length of film reel in a spiral with distorted perspective. Image by Gordon Johnson from Pixabay"
            h={10}
            mr={[0, 3, 3, 3]}
            align="center"
          />
        </Link>
        <Link as={NavLink} to="/">
          <Heading as="h1" size="lg" mt={[3, 0, 0, 0]} mr={[0, 3, 3, 3]}>
            UnReel
          </Heading>
        </Link>
      </Flex>

      {/* Mobile dropdown,shown until md breakpoint (768px) */}
      {user && (
        <Flex display={['flex', 'flex', 'none', 'none']} onClick={handleToggle}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon="chevron-down"
              variant="ghost"
              onClick={handleToggle}
              justify="right"
            />
            <MenuList mr={10} maxWidth="100%">
              <MenuItem as={NavLink} to="/lists">
                Lists
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>

              <MenuItem onClick={() => toggleColorMode()}>
                {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
                <Icon
                  name={colorMode === 'light' ? 'moon' : 'sun'}
                  ml={2}
                />{' '}
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}

      {/* Container for navlinks, show from md breakpoint on */}
      <Flex
        display={['none', 'none', 'flex', 'flex']}
        width={{ sm: 'full', md: 'auto' }}
        align="center"
        flexGrow={1}
      >
        {user && (
          <MenuItems>
            <Button
              as={NavLink}
              to="/lists"
              isOpen={show}
              bg="transparent"
              border="1px"
              className="ease-in"
              size="xs"
            >
              Lists
            </Button>
          </MenuItems>
        )}
      </Flex>

      {/* Container for auth button and user name, show from md breakpoint on */}
      <Flex display={['none', 'none', 'flex', 'flex']} mt={{ base: 4, md: 0 }}>
        {user ? (
          <Flex align="center">
            {user.displayName && (
              <Text
                mr={6}
                fontSize="sm"
                display={{ base: 'none', md: 'block' }}
              >
                Hi {user.displayName}
              </Text>
            )}

            <Button
              size="sm"
              bg="transparent"
              border="1px"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Flex>
        ) : (
          <Link as={NavLink} to="/login">
            <Button
              isOpen={show}
              bg="transparent"
              border="1px"
              className="ease-in"
            >
              Log In
            </Button>
          </Link>
        )}
      </Flex>

      <Flex ml={6} display={[user && 'none', user && 'none', 'flex', 'flex']}>
        <Button rounded="50%" onClick={() => toggleColorMode()}>
          <Icon name={colorMode === 'light' ? 'moon' : 'sun'} />
        </Button>
      </Flex>
    </Flex>
  );
}

export default NavBar;
