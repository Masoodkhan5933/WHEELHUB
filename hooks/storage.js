import { useState } from 'react';
import { Alert } from 'react-native';
import { auth, storage } from '../database/dbconfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const useStorage = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'OK' }]);
  };

  const uploadFile = async (fileUri, folderName) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const uniqueFileName = `${new Date().getTime()}_${Math.floor(
        Math.random() * 10000
      )}`;
      const fileRef = ref(storage, `${folderName}/${uniqueFileName}`);

      // Upload bytes with progress tracking
      const uploadTask = uploadBytes(fileRef, blob);
      uploadTask.on('state_changed', (snapshot) => {
        const progressPercentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercentage);
      });

      await uploadTask;

      // Get download URL
      const downloadUrl = await getDownloadURL(fileRef);
      setUrl(downloadUrl);
      setProgress(0); // Reset progress after successful upload
      return downloadUrl;
    } catch (err) {
      setError(err);
      showAlert('Error', 'Failed to upload file');
      return null;
    }
  };

  const uploadProfilePicture = async (fileUri) => {
    return uploadFile(fileUri, 'profilePictures');
  };

  const uploadCarPictures = async (carPic) => {
    return uploadFile(carPic, 'carPictures/001');
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
