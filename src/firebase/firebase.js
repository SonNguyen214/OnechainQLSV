import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCmoFsPOWBnO0NsWQ65YosfxJTB7CIqZSo",
  authDomain: "onechain-c0e66.firebaseapp.com",
  projectId: "onechain-c0e66",
  storageBucket: "onechain-c0e66.appspot.com",
  messagingSenderId: "777431754707",
  appId: "1:777431754707:web:d8be21e2c5a7f6619f3126",
  measurementId: "G-BJZ0PJ6LDW"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const storage = firebase.storage()

export default db;