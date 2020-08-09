import React from 'react';
import { Box, Text, Image, Flex, useColorMode, Link } from '@chakra-ui/core';
import { FaGithub } from 'react-icons/fa';
import Film from '../images/film.png';
import { REPO_LINK } from '../utils/config';
import './style.css';

function Footer() {
  const { colorMode } = useColorMode();
  return (
    <Box
      as="footer"
      bg={colorMode === 'light' ? 'white' : '#1A202C'}
      w="100%"
      mt="-200px"
      position="fixed"
      borderTop="1px solid #C8C8C8"
      overflowY="scroll"
      bottom="0"
      zIndex={100}
    >
      <Box p={4}>
        <Flex
          justify={['space-around']}
          align="center"
          direction={['row', 'row']}
        >
          <Link href={REPO_LINK} target="_blank">
            <Box as={FaGithub} size={['24px', '36px']} />
          </Link>
          <Flex align="center">
            <Image src={Film} h={5} />
            <Text fontSize={['sm', 'md', 'lg', 'xl']}>UnReel</Text>
          </Flex>

          <div>
            <Text
              fontSize={['sm', 'md', 'lg', 'xl']}
              fontWeight="bold"
              className="text-gradient"
            >
              Powered By
            </Text>
            <Image
              mx="auto"
              my={0}
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
              size={['35px', '30px', '40px', '50px']}
            />
          </div>
        </Flex>
      </Box>
    </Box>
  );
}

export default Footer;
