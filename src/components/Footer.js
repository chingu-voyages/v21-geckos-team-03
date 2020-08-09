import React from 'react';
import { Box, Text, Image, Flex } from '@chakra-ui/core';
import Film from '../images/film.png';
import './style.css';

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
      height="300px"
    >
      <Box padding="30px">
        <Flex
          justify={['center', 'center', 'space-between', 'space-between']}
          align="center"
          direction={['column', 'column', 'row', 'row']}
        >
          <Flex align="center">
            <Image src={Film} h={5} paddingRight="10px" />
            <Text fontSize="4xl">UnReel</Text>
          </Flex>

          <div>
            <Text
              fontSize={['2xl', '2xl', '3xl', '4xl']}
              fontWeight="bold"
              className="text-gradient"
            >
              Powered By
            </Text>
            <Image
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
              size={['120px', '130', '150px', '150px']}
            />
          </div>
        </Flex>
      </Box>
    </Box>
  );
}

export default Footer;
