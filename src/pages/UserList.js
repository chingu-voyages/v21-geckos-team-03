import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../firebase';
import Movies from '../components/Movies';
// import PropTypes from 'prop-types';

/* 
  Route: "/lists/:TBA"
  Page for rendering components in a single user created watch list
*/

function UserList() {
  const { user, firebase } = useContext(FirebaseContext);
  const { listid } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (listid) {
      try {
        const collectionRef = firebase.db
          .doc(`users/${user.uid}`)
          .collection('lists');
        collectionRef
          .doc(`/${listid}`)
          .collection('movies')
          .get()
          .then((querySnapshot) => {
            const fetchedMovies = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setMovies(fetchedMovies);
          });
      } catch (err) {
        console.log('error: ', err.message);
      }
    }
  }, [listid, firebase.db]);

  console.log('listid:', listid);
  console.log('movies', movies);
  return <Movies movies={movies} />;
}

UserList.propTypes = {};

export default UserList;
