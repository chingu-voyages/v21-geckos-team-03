import { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../firebase';

function useFetchLists() {
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
            const fetchedLists = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setLists(fetchedLists);
          });
      } catch (err) {
        console.log(err.message);
      }
    }
  }, [user, firebase.db]);

  return lists;
}

export default useFetchLists;
