import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/core';
import Navbar from './NavBar';

const Layout = ({ children }) => (
  <>
    <Navbar />
    <Box maxWidth="1200px" p={[2, 6, 8, 16]} mx="auto" my={0}>
      {children}
    </Box>
  </>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
