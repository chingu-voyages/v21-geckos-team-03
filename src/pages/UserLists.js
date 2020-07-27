import React from 'react';
import { Divider, Heading, Link, Text, Flex, Button } from '@chakra-ui/core';
import useWatchLists from '../hooks/useWatchLists';
import SimpleBox from '../components/SimpleBox/SimpleBox';

/* 
  Route: "/lists"
  Page for rendering all user created watch lists

  Currently contains mvp functionality for fetching all created lists in a logged in users list collection.
  This should be moved eventually
*/

const UserLists = (props) => {
  const { watchLists, loading, error, createWatchList } = useWatchLists();

  const newList = {
    createdAt: new Date(),
    title: 'My Fifth list',
    description: 'this is a new test list created from front end',
    movies: [10293, 10290, 1090],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createWatchList(newList);
  };

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
          <Heading as="h1" size="2xl">
            My Lists
          </Heading>
          <Button variantColor="green" type="submit" onClick={handleSubmit}>
            Create New List
          </Button>
        </Flex>
      </SimpleBox>
      <SimpleBox>{generateLists()}</SimpleBox>
    </>
  );
};

export default UserLists;
