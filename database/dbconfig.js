

import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEuy6drR0VYIkXaO_-XmHTQ1YKxRfYS3c",
  authDomain: "wheelshub-dc0d5.firebaseapp.com",
  projectId: "wheelshub-dc0d5",
  storageBucket: "wheelshub-dc0d5.appspot.com",
  messagingSenderId: "1089155910219",
  appId: "1:1089155910219:web:8548fe3141763783d61bce",
  measurementId: "G-8R5C5K8RL1"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Use the already initialized app
}

const firestore = getFirestore(app);

// Initialize Firebase Auth

// const auth= getAuth(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const storage = getStorage(app);

export {  auth,firestore, storage };