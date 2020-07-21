/* eslint-disable no-return-await */
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import fireBaseConfig from './config';

class Firebase {
  constructor() {
    app.initializeApp(fireBaseConfig);
    // app.analytics();
    this.auth = app.auth();
    this.db = app.firestore();
  }

  async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    // this is the method that needs to be replace updateProfile
    // createUserProfileDocument
    // if (!newUser) return
    // get userRef of uid
    // take snapshot
    // if snapshot doesn't exist create new one...
    return await newUser.user.updateProfile({
      displayName: name,
    });
  }

  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
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
