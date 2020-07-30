import React from 'react';
import { Divider, Heading, Link } from '@chakra-ui/core';
// import PropTypes from 'prop-types';
import CreateList from '../components/CreateList';
import useWatchLists from '../hooks/useWatchLists';
import SimpleBox from '../components/SimpleBox';

// page for viewing all of a user's lists

/* 
  Route: "/lists"
  Page for rendering all user created watch lists

  Currently contains mvp functionality for fetching all created lists in a logged in users list collection.
  This should be moved eventually
*/

const UserLists = (props) => {
  const userLists = useWatchLists();

  const generateLists = () => {
    if (!userLists) {
      return [];
    }
    let i = 0;
    const options = userLists.map((list) => {
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

UserLists.propTypes = {};

export default UserLists;
