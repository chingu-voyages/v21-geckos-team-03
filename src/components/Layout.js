import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@chakra-ui/core';
import Navbar from './NavBar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => (
  <>
    <Navbar />
    <Flex maxWidth="1200px" p={[4, 6, 8]} mx="auto" my={0}>
      <Sidebar />
      <Box width="100%">{children}</Box>
    </Flex>
  </>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
