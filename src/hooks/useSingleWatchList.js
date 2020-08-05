import { useEffect, useContext, useState } from 'react';
import useWatchLists from './useWatchLists';
import { FirebaseContext } from '../firebase';

function useSingleWatchList(listId) {
  const { user, firebase } = useContext(FirebaseContext);
  const { watchLists } = useWatchLists();
  const [listMovies, setListMovies] = useState([]);
  const [listDetails, setListDetails] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // console.log(listDetails);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const currentListById = watchLists.find((list) => list.id === listId);
    setListDetails(currentListById);

    function getMoviesInWatchList() {
      if (user) {
        try {
          firebase.db
            .doc(`users/${user.uid}`)
            .collection('lists')
            .doc(`/${listId}`)
            .collection('movies')
            .onSnapshot((snapshot) => {
              const fetchedMovies = snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
              });
              setListMovies(fetchedMovies);
              setError(null);
              setLoading(false);
            });
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      }
      return () => {};
    }
    const unsubscribe = getMoviesInWatchList();
    return () => unsubscribe();
  }, [listId, user, firebase, watchLists]);

  return { listMovies, listDetails, error, loading };
}

export default useSingleWatchList;
