import React from 'react';
import { Divider } from '@chakra-ui/core';
// import PropTypes from 'prop-types';
import CreateList from '../components/CreateList';
import useFetchLists from '../hooks/useFetchLists';
import SimpleBox from '../components/SimpleBox/SimpleBox';

// page for viewing all of a user's lists

/* 
  Route: "/lists"
  Page for rendering all user created watch lists

  Currently contains mvp functionality for fetching all created lists in a logged in users list collection.
  This should be moved eventually
*/

const UserLists = (props) => {
  const userLists = useFetchLists();

  const generateLists = () => {
    if (!userLists) {
      return [];
    }
    let i = 0;
    const options = userLists.map((list) => {
      i += 1;
      return (
        <SimpleBox key={`${i}-${list.title}`}>
          {list.title}
          <Divider />
          {list.description}
        </SimpleBox>
      );
    });
    return options;
  };
  return (
    <SimpleBox>
      {generateLists()}
      <CreateList />
    </SimpleBox>
  );
};

UserLists.propTypes = {};

export default UserLists;
