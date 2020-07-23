import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Heading, Flex, Text, Button, Link } from '@chakra-ui/core';
import { FirebaseContext } from '../../firebase';

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

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Link as={NavLink} to="/">
          <Heading as="h1" size="lg">
            WatchList
          </Heading>
        </Link>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        {user && (
          <MenuItems>
            <Link as={NavLink} to="/lists">
              WatchLists
            </Link>
          </MenuItems>
        )}
      </Box>

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
              onClick={() => firebase.logout()}
            >
              Logout
            </Button>
          </Flex>
        ) : (
          <Link as={NavLink} to="/login">
            <Button bg="transparent" border="1px">
              Log In
            </Button>
          </Link>
        )}
      </Box>
    </Flex>
  );
}

export default NavBar;
