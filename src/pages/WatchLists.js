import React, { useContext } from 'react';
import { Divider, Heading, Link, Text, Flex } from '@chakra-ui/core';
import { SimpleBox } from '../components';
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
          <Link href={`/list/${list.id}`}>
            <Heading as="h4" size="md">
              {list.title}
            </Heading>
          </Link>
          <Divider />
          {list.description}
        </SimpleBox>
      );
    });
    return options;
  };

  if (loading) return <Text>Loading Lists...</Text>;
  if (error) return <Text>Error loading Lists</Text>;

  return (
    <>
      <SimpleBox>
        <Flex align="center" justify="space-between">
          <Heading as="h2" size="2xl">
            {user
              ? `${user.displayName.toUpperCase()}'s Watch Lists`
              : 'Your Watch Lists'}
          </Heading>
          <NewListModal />
        </Flex>
      </SimpleBox>
      <SimpleBox>{generateLists()}</SimpleBox>
    </>
  );
};

export default WatchLists;
