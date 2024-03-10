import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    // Retrieve the selected city from local storage when the component mounts
    const fetchlatitude = async () => {
      try {
        const storedLatitude = await AsyncStorage.getItem("latitude");
        const storedLongitude = await AsyncStorage.getItem("longitude");

        const storedFloatLatitude = parseFloat(storedLatitude);
        const storedFloatLongitude = parseFloat(storedLongitude);
        if (storedFloatLatitude && storedFloatLongitude) {
          setLatitude(storedLatitude);
          setLongitude(storedLongitude);
        }
      } catch (error) {
        console.error("Error retrieving Coordinates:", error);
      }
    };

    fetchlatitude();
  }, []);

  const saveCordinates = async (latitude, longitude) => {
    try {
      await AsyncStorage.setItem("latitude", latitude.toString());
      await AsyncStorage.setItem("longitude", longitude.toString());
      setLatitude(latitude);
      setLongitude(longitude);

      // console.log("set:", latitude, longitude);
    } catch (error) {
      console.error("Error saving selected city:", error);
    }
  };

  return { latitude, longitude, saveCordinates };
};

export default useLocation;
