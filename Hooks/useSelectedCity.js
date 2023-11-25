import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useSelectedCity = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    // Retrieve the selected city from local storage when the component mounts
    const fetchSelectedCity = async () => {
      try {
        const storedCity = await AsyncStorage.getItem('selectedCity');
        if (storedCity) {
          setSelectedCity(storedCity);
        }
      } catch (error) {
        console.error('Error retrieving selected city:', error);
      }
    };

    fetchSelectedCity();
  }, []);

  const saveSelectedCity = async (city) => {
    try {
      await AsyncStorage.setItem('selectedCity', city);
      setSelectedCity(city);
    } catch (error) {
      console.error('Error saving selected city:', error);
    }
  };

  return { selectedCity, saveSelectedCity };
};

export default useSelectedCity;