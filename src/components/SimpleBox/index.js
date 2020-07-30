import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/core';

const SimpleBox = ({ children }) => {
  return (
    <Box
      w="100%"
      p={4}
      mb={2}
      border="1px"
      borderRadius="md"
      borderColor="gray.200"
    >
      {children}
    </Box>
  );
};

export default SimpleBox;

SimpleBox.propTypes = {
  children: PropTypes.node.isRequired,
};
