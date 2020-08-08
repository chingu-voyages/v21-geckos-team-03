import {
  Flex,
  Divider,
  Text,
  Stack,
  Box,
  Link,
  Heading,
} from '@chakra-ui/core';
import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FirebaseContext } from '../firebase';
import useWatchLists from '../hooks/useWatchLists';
import NewListModal from './NewListModal';

const Sidebar = () => {
  const { user } = useContext(FirebaseContext);
  const { watchLists } = useWatchLists();
  return (
    <Flex display={{ base: 'none', md: 'flex' }}>
      <Flex width="100%" maxWidth="200px" direction="column">
        {user && (
          <Box my={4}>
            <Heading fontSize="md">Hello, {user.displayName}!</Heading>
          </Box>
        )}
        <Box my={6}>
          <Divider />
          <Heading fontSize="xl">Total Lists</Heading>
          <Divider />
          <Text>{watchLists.length}</Text>
        </Box>
        <Box my={6}>
          <Box mb={4}>
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
          </Stack>
          <Box mt={8}>
            <Divider />
            <Box mt={6}>
              <NewListModal full />
            </Box>
          </Box>
        </Box>
      </Flex>
      <Divider mx={12} orientation="vertical" />
    </Flex>
  );
};

export default Sidebar;
