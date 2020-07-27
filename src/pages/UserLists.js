import React from 'react';
import { Divider, Heading, Link, Text } from '@chakra-ui/core';
import CreateList from '../components/CreateList';
import useWatchLists from '../hooks/useWatchLists';
import SimpleBox from '../components/SimpleBox/SimpleBox';

/* 
  Route: "/lists"
  Page for rendering all user created watch lists

  Currently contains mvp functionality for fetching all created lists in a logged in users list collection.
  This should be moved eventually
*/

const UserLists = (props) => {
  const { watchLists, loading, error } = useWatchLists();

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
        <Heading as="h1" size="2xl">
          My Lists
        </Heading>
      </SimpleBox>
      <SimpleBox>
        {generateLists()}
        <CreateList />
      </SimpleBox>
    </>
  );
};

export default UserLists;
