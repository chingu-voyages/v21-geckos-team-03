import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Navbar from '../NavBar';

/* 
  Renders primary navigation and main html element as parent elements
  that wraps all other JSX components as children in App.js
*/

const StyledMainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px;
`;

const Layout = ({ children }) => (
  <>
    <Navbar />
    <StyledMainContainer>{children}</StyledMainContainer>
  </>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
