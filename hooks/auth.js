// useAuth.js

import { useState, useEffect } from 'react';
import { auth } from '../database/dbconfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import Firestore from './firestore';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const { getUserProfile, setUserProfile } = Firestore();

  const authenticateUser = async (user) => {
    if (user) {
      const userProfile = await getUserProfile(user.uid);
      setUser({ ...user, ...userProfile });
    } else {
      setUser(null);
    }
    setLoading(false);
    setAuthReady(true);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      await authenticateUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const userProfile = await getUserProfile(auth.currentUser.uid);
      await authenticateUser(auth.currentUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      delete data.password;
      await setUserProfile(userCredential.user.uid, data);
    } catch (error) {
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return { user, loading, signIn, signUp, signOutUser, authReady };
};

export default useAuth;
