import { useState, useEffect } from 'react';
import firebase from '../firebase';

/* 
  Listens for changes in the firebase authentication service, 
  if logged in user is detected the user object is 
  set in state and passed to the app via context in App.js
*/

function useAuth() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      user ? setAuthUser(user) : setAuthUser(null);
    });
    return () => unsubscribe();
  }, []);

  return authUser;
}

export default useAuth;
