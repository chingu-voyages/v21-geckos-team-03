import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Link,
  Icon,
  useColorMode,
  Image,
} from '@chakra-ui/core';
import Film from '../images/film.png';

import { FirebaseContext } from '../firebase';

/* 
Primary navigation bar for the app.
Responsive/mobile first
Hides watchlist navlink  with no logged in user.  
Says hello to logged in user's display name
*/

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
  const handleToggle = () => setShow(!show);
  const { colorMode, toggleColorMode } = useColorMode();
  const history = useHistory();

  function handleLogout() {
    firebase.logout();
    history.push('/login');
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      borderBottom="1px solid #C8C8C8"
    >
      <Flex align="center" justify="center" mr={5}>
        <Link as={NavLink} to="/">
          <Image
            src={Film}
            alt="A length of film reel in a spiral with distorted perspective. Image by Gordon Johnson from Pixabay"
            width={[
              '100%', // base
              '50%', // 480px upwards
              '25%', // 768px upwards
              '15%', // 992px upwards
            ]}
          />
        </Link>
        <Link as={NavLink} to="/">
          <Heading as="h1" size="lg">
            UnReel
          </Heading>
        </Link>
      </Flex>

      {/* Mobile dropdown,shown until md breakpoint (768px) */}
      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <svg
          fill="#63b3ed"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      {/* Container for navlinks */}
      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        {user && (
          <MenuItems>
            <Link as={NavLink} to="/lists">
              My Lists
            </Link>
          </MenuItems>
        )}
      </Box>
      {/* Container for auth button and user name */}
      <Box
        display={{ sm: show ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        {user ? (
          <Flex align="center">
            <Text mr={6} fontSize="sm" display={{ base: 'none', md: 'block' }}>
              Hi {user.displayName}
            </Text>
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
      </Box>

      <Box ml={6}>
        <Button rounded="50%" onClick={() => toggleColorMode()}>
          <Icon name={colorMode === 'light' ? 'moon' : 'sun'} />
        </Button>
      </Box>
    </Flex>
  );
}

export default NavBar;
