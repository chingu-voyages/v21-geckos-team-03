import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../NavBar';

import { StyledMainContainer } from './styles';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <StyledMainContainer>{children}</StyledMainContainer>
    </>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
