import {
  getDoc,
  deleteDoc,
  getDocs,
  where,
  query,
  collection,
  doc,
  setDoc,
} from 'firebase/firestore';
import { useState } from 'react';
import { firestore } from '../database/dbconfig';

const Firestore = () => {
  const [loading, setLoading] = useState(false);
  const [carss, setCars] = useState("");

  const setUserProfile = async (userId, profileData) => {
    try {
      const userProfileRef = doc(firestore, 'users', userId);
      await setDoc(userProfileRef, profileData);
    } catch (error) {
      console.error('Error setting user profile:', error);
      throw error;
    }
  };

  const getUserProfile = async (userId) => {
    try {
      const userProfileRef = doc(firestore, 'users', userId);
      const docSnap = await getDoc(userProfileRef);
      const data = docSnap.data();
      return docSnap.exists() ? data : null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  };

  // User operations
  const addUser = async (userData) => {
    const usersRef = collection(firestore, 'users');
    await setDoc(doc(usersRef, userData.email), userData);
  };

  const deleteUser = async (email) => {
    const userRef = doc(firestore, 'users', email);
    await deleteDoc(userRef);
  };

  const updateUser = async (email, updatedUserData) => {
    const userRef = doc(firestore, 'users', email);
    await setDoc(userRef, updatedUserData, { merge: true });
  };

  const getUsers = async () => {
    const usersCollection = collection(firestore, 'users');
    const querySnapshot = await getDocs(usersCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  const userExists = async (email, password) => {
    setLoading(true);
    const q = query(collection(firestore, 'users'), where('email', '==', email), where('password', '==', password));

    const querySnapshot = await getDocs(q);
    setLoading(false);
    return querySnapshot.docs.length > 0 ? true : false;
  };

  // Car operations
  const filterCars = async (filters) => {
    setLoading(true);
    
    try {
      let filteredCars = await getCars(); // Get all cars initially

      // Apply filters
      if (filters.make) {
        filteredCars = filteredCars.filter((car) => car.make === filters.make);
      }

      if (filters.transmission) {
        filteredCars = filteredCars.filter((car) => car.transmission === filters.transmission);
      }

      if (filters.province) {
        filteredCars = filteredCars.filter((car) => car.province === filters.province);
      }

      // You can add more filters as needed

      setCars(filteredCars); // Update the cars data
    } catch (error) {
      console.error('Error filtering cars:', error);
    } finally {
      setLoading(false);
    }
  };



  const addCar = async (carData) => {
    try {
      const carsCollection = collection(firestore, 'cars');
      await setDoc(doc(carsCollection), carData);
    } catch (error) {
      console.error('Error adding car:', error);
      throw error; 
    }
  };

  const deleteCar = async (carName) => {
    const carRef = doc(firestore, 'cars', carName);
    await deleteDoc(carRef);
  };

  const updateCar = async (carName, updatedCarData) => {
    const carRef = doc(firestore, 'cars', carName);
    await setDoc(carRef, updatedCarData, { merge: true });
  };

  const getCars = async () => {
    try {
      const carsCollection = collection(firestore, 'cars');
      const querySnapshot = await getDocs(carsCollection);
      const carsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCars(carsData); // Update the state using setCars
      return carsData; // Return the data
    } catch (error) {
      console.error('Error fetching cars:', error);
      return []; 
    }
  }

  const carExists = async (carName) => {
    setLoading(true);
    const q = query(collection(firestore, 'cars'), where('carName', '==', carName));

    const querySnapshot = await getDocs(q);
    setLoading(false);
    return querySnapshot.docs.length > 0 ? true : false;
  };

  return {
    getUserProfile,
    setUserProfile,
    addUser,
    deleteUser,
    updateUser,
    getUsers,
    userExists,
    addCar,
    deleteCar,
    updateCar,
    getCars,
    carExists,
    filterCars,
    carss,
    loading,
  };
};

export default Firestore;
