import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/core';
import Navbar from '../NavBar';

/* 
  Renders primary navigation and main html element as parent elements
  that wraps all other JSX components as children in App.js
*/

const Layout = ({ children }) => (
  <>
    <Navbar />
    <Box maxWidth="1100px" p={6} mx="auto" my={0}>
      {children}
    </Box>
  </>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
