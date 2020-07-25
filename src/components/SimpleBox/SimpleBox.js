import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/core';

// page for viewing all of a user's lists

const SimpleBox = ({ key, children }) => {
  return (
    <Box
      key={key}
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
  key: PropTypes.string,
};

SimpleBox.defaultProps = {
  key: null,
};
