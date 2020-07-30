import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Divider, Heading, Link, Text, Flex, Button } from '@chakra-ui/core';
import useWatchLists from '../hooks/useWatchLists';
import SimpleBox from '../components/SimpleBox';
import { FirebaseContext } from '../firebase';

/* 
  Route: "/lists"
  Page for rendering all user created watch lists

  Currently contains mvp functionality for fetching all created lists in a logged in users list collection.
  This should be moved eventually
*/

const WatchLists = (props) => {
  const { watchLists, loading, error } = useWatchLists();
  const { firebase, user } = useContext(FirebaseContext);
  const history = useHistory();

  const newList = {
    createdAt: new Date(),
    title: 'My Sixth list',
    description: 'this is a new test list created from front end',
    movies: [10293, 10290, 1090],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      history.push('login');
    } else {
      firebase.createNewWatchList(newList, user.uid);
    }
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
          <Heading as="h2" size="2xl">
            {user
              ? `${user.displayName.toUpperCase()}'s Watch Lists`
              : 'You Watchlists'}
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

export default WatchLists;
