import React, { useState, useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';
import CreateList from '../components/CreateList';
import { FirebaseContext } from '../firebase';

/* 
  Route: "/lists"
  Page for rendering all user created watch lists

  Currently contains mvp functionality for fetching all created lists in a logged in users list collection.
  This should be moved eventually
*/

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
              // setLists((prev) => [...prev, doc.data()]);
              setLists((prev) => [...prev, { [doc.id]: doc.data() }]);
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
