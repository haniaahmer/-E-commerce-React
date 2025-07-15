import { useState, useEffect } from 'react';

export const useFormLocalStorage = (key, initialData) => {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialData;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialData;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(formData));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [formData, key]);

  const resetForm = () => {
    setFormData(initialData);
    localStorage.setItem(key, JSON.stringify(initialData)); // Store initial data instead of removing
  };

  return [formData, setFormData, resetForm];
};