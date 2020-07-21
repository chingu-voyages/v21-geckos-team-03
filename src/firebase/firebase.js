import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import fireBaseConfig from './config';

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
}

const firebase = new Firebase();

export default firebase;
