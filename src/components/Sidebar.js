import {
  Flex,
  Divider,
  Text,
  Stack,
  Button,
  Box,
  Link,
  Heading,
} from '@chakra-ui/core';
import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FirebaseContext } from '../firebase';
import useWatchLists from '../hooks/useWatchLists';
import NewListModal from './NewListModal';

const Sidebar = () => {
  const { user } = useContext(FirebaseContext);
  const { watchLists } = useWatchLists();
  return (
    <Box p={4} display={['none', 'none', 'block']}>
      <Flex
        position="fixed"
        overflowY="hidden"
        overflowX="scroll"
        top="150px"
        bottom="0"
        maxWidth="18rem"
      >
        <Flex direction="column" w="100%">
          {user && (
            <Flex mb={2} align="center">
              <Box as={FaUserCircle} size="48px" mb={2} mr={2} />
              <Heading fontSize="lg">{user.displayName}</Heading>
            </Flex>
          )}
          <Box my={3}>
            <Divider />
            <Heading fontSize="xl">Total Lists</Heading>
            <Divider />
            <Box mx="auto">
              <Text p={3} height="100%" fontSize="xl">
                {watchLists.length}
              </Text>
            </Box>
          </Box>
          <Box mb={3}>
            <Box mb={6}>
              <Divider />
              <Heading fontSize="xl">Current Lists</Heading>
              <Divider />
            </Box>

            <Stack spacing={10}>
              {watchLists &&
                watchLists.map((list) => (
                  <Link key={list.id} as={RouterLink} to={`/list/${list.id}`}>
                    <Text fontSize="lg">{list.title}</Text>
                  </Link>
                ))}
              <Button
                as={RouterLink}
                to="/lists"
                bg="transparent"
                border="1px"
                size="xs"
              >
                View All
              </Button>
            </Stack>
            <Box mt={8}>
              <Divider />
              <Flex mt={6} justify="center">
                <NewListModal full />
              </Flex>
            </Box>
          </Box>
        </Flex>
        <Divider mx={12} orientation="vertical" height="100%" />
      </Flex>
    </Box>
  );
};

export default Sidebar;
