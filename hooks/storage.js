import { useState } from 'react';
import { auth, storage } from '../database/dbconfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const useStorage = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const uploadFile = async (fileUri, folderName) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const uniqueFileName = `${new Date().getTime()}_${Math.floor(
        Math.random() * 10000
      )}`;
      const fileRef = ref(storage, `${folderName}/${uniqueFileName}`);
      await uploadBytes(fileRef, blob);
      const downloadUrl = await getDownloadURL(fileRef);
      return downloadUrl;
    } catch (err) {
      console.error('Error uploading file: ', err);
      setError(err);
      return null;
    }
  };

  const uploadProfilePicture = async (fileUri) => {
    return uploadFile(fileUri, 'profilePictures');
  };

  const uploadCarPictures = async (carPic) => {
    const downloadUrl = await uploadFile(carPic, 'carPictures/001');

    return downloadUrl;
  };

  return {
    progress,
    url,
    error,
    uploadProfilePicture,
    uploadCarPictures,
  };
};

export default useStorage;