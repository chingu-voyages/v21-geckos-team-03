import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@chakra-ui/core';
import FirebaseContext from '../../firebase/context';
import SimpleBox from '../SimpleBox/SimpleBox';
import useWatchLists from '../../hooks/useWatchLists';

/* 
  Contains the current implementation of creating new watchlists and submitting them to Firestore
  Renders a button that submits a newList object to the current logged in user's list collection.
  Will eventually take in user input
  Work in progress
*/

const CreateList = () => {
  const { user } = useContext(FirebaseContext);
  const history = useHistory();
  const { createWatchList } = useWatchLists();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      history.push('/login');
    } else {
      createWatchList(newList);
      history.push('/lists');
    }
  };

  const createdAt = new Date();
  const newList = {
    createdAt,
    title: 'My Third list',
    description: 'this is a new test list created from front end',
    movies: [10293, 10290, 1090],
  };

  return (
    <SimpleBox>
      <form onSubmit={handleSubmit}>
        <Button variantColor="green" type="submit">
          Create New List
        </Button>
      </form>
    </SimpleBox>
  );
};

export default CreateList;
