import React, { useState, useContext, useEffect } from 'react';
import CreateList from '../components/CreateList';
import { FirebaseContext } from '../firebase';

// import PropTypes from 'prop-types';

const UserLists = (props) => {
  const { user, firebase } = useContext(FirebaseContext);
  const [lists, setLists] = useState([]);
  console.log(lists);

  useEffect(() => {
    if (user) {
      try {
        firebase.db
          .doc(`users/${user.uid}`)
          .collection('lists')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setLists((prev) => [...prev, doc.data()]);
            });
          });
      } catch (err) {
        console.log(err.message);
      }
    }
  }, [user, firebase.db]);

  return <CreateList />;
};

UserLists.propTypes = {};

export default UserLists;
