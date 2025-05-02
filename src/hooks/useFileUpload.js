import { useState } from 'react';
import axios from 'axios';

export const useFileUpload = () => {
  const [pictures, setPictures] = useState({});
  const [errors, setErrors] = useState({});

  const handleUpload = (field) => async (file) => {
    try {
      const formData = new FormData();
      formData.append('files', file);
      const res = await axios.post(
        `${process.env.REACT_APP_DOMAIN_URL}/api/upload`, 
        formData
      );
      
      setPictures(prev => ({
        ...prev,
        [field]: res.data[0]
      }));
      
      setErrors(prev => ({
        ...prev,
        [field]: false
      }));
      
      return true;
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        [field]: true
      }));
      return false;
    }
  };

  return { pictures, errors, handleUpload, setPictures, setErrors };
};