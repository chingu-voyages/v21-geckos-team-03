import React from 'react';
import { Box, Divider } from '@chakra-ui/core';
import CreateList from '../components/CreateList';
import useFetchLists from '../hooks/useFetchLists';

// page for viewing all of a user's lists

// import PropTypes from 'prop-types';

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
        <Box key={`${i}-${list.title}`}>
          {list.title}
          <Divider />
          {list.description}
        </Box>
      );
    });
    return options;
  };
  return (
    <Box>
      <CreateList />
      {generateLists()}
      <CreateList />
    </Box>
  );
};

UserLists.propTypes = {};

export default UserLists;
