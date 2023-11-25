import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const useLocation = async () => {
  const [locationData, setLocationData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const cachedLatitude = await AsyncStorage.getItem("CachedLatitude");
      const cachedLongitude = await AsyncStorage.getItem("CachedLongitude");
      const CachedLatitude = parseFloat(cachedLatitude);
      const CachedLongitude = parseFloat(cachedLongitude);

      setLatitude(CachedLatitude);
      setLongitude(CachedLongitude);

      console.log("FINAL", latitude, longitude);
    };

    fetchData();
  }, []);

  const updateLiveLocation = (data) => {
    setLocationData(data);
  };

  return {
    locationData,
    updateLiveLocation,
    latitude,
    longitude,
    setLongitude,
    setLatitude,
  };
};

export default useLocation;
