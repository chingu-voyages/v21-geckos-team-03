import React from 'react';
import { Box, Text, Image, Flex } from '@chakra-ui/core';
import Film from '../images/film.png';

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
        <Flex justify="space-between" align="center">
          <Flex align="center">
            <Image src={Film} h={10} paddingRight="10px" />
            <Text fontSize="4xl">UnReel</Text>
          </Flex>

          <div>
            <Text fontSize="4xl" fontWeight="bold">
              Powered By
            </Text>
            <Image
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
              size="150px"
            />
          </div>
        </Flex>
      </Box>
    </Box>
  );
}

export default Footer;
