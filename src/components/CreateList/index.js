import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import FirebaseContext from '../../firebase/context';

const CreateList = () => {
  const { firebase, user } = useContext(FirebaseContext);
  const history = useHistory();

  const handleCreateList = async (e) => {
    e.preventDefault();
    if (!user) {
      history.push('/login');
    } else {
      const createdAt = new Date();
      const newList = {
        createdAt,
        title: 'My second list',
        description: 'this is another test list created from front end',
        movies: [10293, 10290, 1090],
      };
      firebase.db.doc(`users/${user.uid}`).collection('lists').add(newList);
      history.push('/');
    }
  };
  return (
    <form onSubmit={handleCreateList}>
      <button type="submit">Create New List</button>
    </form>
  );
};

export default CreateList;
