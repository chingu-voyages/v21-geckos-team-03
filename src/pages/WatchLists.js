import React, { useContext } from 'react';
import { Divider, Heading, Link, Text, Flex, Spinner } from '@chakra-ui/core';
import { SimpleBox, DeleteListModal } from '../components';
import { FirebaseContext } from '../firebase';
import useWatchLists from '../hooks/useWatchLists';
import NewListModal from '../components/NewListModal';

/* 
  Route: "/lists"
  Page for rendering all user created watch lists

  Currently contains mvp functionality for fetching all created lists in a logged in users list collection.
  This should be moved eventually
*/

const WatchLists = (props) => {
  const { watchLists, loading, error } = useWatchLists();
  const { user } = useContext(FirebaseContext);

  const generateLists = () => {
    if (!watchLists) {
      return [];
    }
    let i = 0;
    const options = watchLists.map((list) => {
      i += 1;
      return (
        <SimpleBox key={`${i}-${list.title}`}>
          <Flex justify="space-between">
            <Flex align="center">
              <Link href={`/list/${list.id}`}>
                <Heading as="h4" size="md">
                  {list.title}
                </Heading>
              </Link>
            </Flex>
            <Flex>
              <DeleteListModal list={list} />
            </Flex>
          </Flex>
          <Divider />
          <Flex align="center" pl={5}>
            {list.description.length > 120
              ? `${list.description.slice(0, 120)} ...`
              : list.description}
          </Flex>
        </SimpleBox>
      );
    });
    return options;
  };

  if (loading) return <Spinner />;
  if (error) return <Text>Error loading Lists</Text>;

  return (
    <>
      <Flex align="center" justify="space-between" p={5}>
        <Heading fontSize="2xl">
          {user
            ? `${user.displayName.toUpperCase()}'s Watch Lists`
            : 'Watch Lists'}
        </Heading>

        <NewListModal />
      </Flex>
      <Divider mb={8} />
      {!watchLists || watchLists.length === 0 ? (
        <Flex
          w="100%"
          p={4}
          mb={2}
          border="1px"
          borderRadius="md"
          borderColor="gray.200"
          textAlign="center"
          flexDir="column"
        >
          <Text>You don&apos;t have any lists yet!</Text>
          <Flex justify="center">
            <NewListModal noLists />
          </Flex>
        </Flex>
      ) : (
        generateLists()
      )}
    </>
  );
};

export default WatchLists;
