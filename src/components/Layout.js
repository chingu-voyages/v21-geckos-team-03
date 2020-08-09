import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@chakra-ui/core';
import Navbar from './NavBar';
import Sidebar from './Sidebar';
import { FirebaseContext } from '../firebase';

const Layout = ({ children }) => {
  const { user } = useContext(FirebaseContext);

  return (
    // <>
    //   <Navbar />
    //   <Flex maxWidth="1200px" p={[4, 6, 8]} mx="auto" my={0}>
    //     {user && <Sidebar />}
    //     <Box width="100%">{children}</Box>
    //   </Flex>
    // </>

    <Flex direction="column" minHeight="100vh" mx="auto" my={0}>
      <Navbar />
      <Flex p={[4, 6, 8]} flex={1} direction={['column', 'column', 'row']}>
        <Box flex={1} minWidth={0} mt={20} ml="18rem" maxWidth="800px">
          {children}
        </Box>
        <Box flexBasis={['auto', 'auto', '64']} order="-1">
          {user && <Sidebar />}
        </Box>
      </Flex>
      <div>Footer</div>
    </Flex>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
