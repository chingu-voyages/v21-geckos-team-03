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

  return lists;
}

export default useFetchLists;
