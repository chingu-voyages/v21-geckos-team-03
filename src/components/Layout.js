import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@chakra-ui/core';
import Navbar from './NavBar';
import Sidebar from './Sidebar';
import { FirebaseContext } from '../firebase';

const Layout = ({ children }) => {
  const { user } = useContext(FirebaseContext);

  return (
    <>
      <Navbar />
      <Flex maxWidth="1200px" p={[4, 6, 8]} mx="auto" my={0}>
        {user && <Sidebar />}
        <Box width="100%">{children}</Box>
      </Flex>
    </>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
