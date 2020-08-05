import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import fireBaseConfig from './config';

/* 
  Initializes firebase authentication and firestore db in a class.  
  Class also contains methods that contain firebase user auth functionality 
  Entire class is exported and made available to the app via react context
*/

class Firebase {
  constructor() {
    app.initializeApp(fireBaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  async register(name, email, password, additionalData) {
    const { user } = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    // create a reference to the user uid generated above
    const userRef = this.db.doc(`users/${user.uid}`);
    // take a snapshot of the reference
    const snapShot = await userRef.get();
    // check exists property on userRef snapshot.
    // if false, set (aka create) new document in the collection ref with the passed in values
    if (!snapShot.exists) {
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName: name,
          email,
          createdAt,
          ...additionalData,
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
    // returns so newly created displayName name is passed into state for UI
    return user.updateProfile({
      displayName: name,
    });
  }

  async login(email, password) {
    await this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }

  async resetPassword(email) {
    await this.auth.sendPasswordResetEmail(email);
  }

  async createNewWatchList(newList, userId) {
    await this.db.doc(`users/${userId}`).collection('lists').add(newList);
  }

  async getMoviesInWatchList(userId, listId, snapshot) {
    return this.db
      .doc(`users/${userId}`)
      .collection('lists')
      .doc(`/${listId}`)
      .collection('movies')
      .onSnapshot(snapshot);
  }
}

const firebase = new Firebase();

export default firebase;
