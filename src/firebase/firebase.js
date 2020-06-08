import * as firebase from 'firebase/app';
import 'firebase/auth';

import {firebaseConfig} from "./config"



export const init = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig).auth();
  }
};

export const authWithPassword = (user) =>
  firebase.auth().signInWithEmailAndPassword(user.email, user.password);