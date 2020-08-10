import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@chakra-ui/core';
import Navbar from './NavBar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FirebaseContext } from '../firebase';

const Layout = ({ children }) => {
  const { user } = useContext(FirebaseContext);

  return (
    <Flex direction="column" minHeight="100vh" mx="auto" my={0}>
      <Navbar />
      <Flex p={[4, 6, 8]} flex={1} direction={['column', 'column', 'row']}>
        <Box
          flex={1}
          minWidth={0}
          mt={20}
          ml={user ? ['0', '0 ', '18rem'] : '0'}
          my={0}
        >
          {children}
        </Box>
        <Box flexBasis={['auto', 'auto', '64']} order="-1">
          {user && <Sidebar />}
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
