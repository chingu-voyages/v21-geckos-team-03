import React from 'react';
import { Box, Text } from '@chakra-ui/core';

function Footer() {
  return (
    <Box
      bg="black"
      w="100%"
      p={4}
      color="white"
      position="absolute"
      left="0px"
      mt="50px"
      height="400px"
    >
      <Box padding="50px">
        <Text fontSize="4xl">UnReel</Text>
      </Box>
    </Box>
  );
}

export default Footer;
