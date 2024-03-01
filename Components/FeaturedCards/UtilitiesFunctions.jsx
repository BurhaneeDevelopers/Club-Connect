import { useEffect } from "react";
import useLocation from "../../Hooks/useLocation";
import useSelectedCity from "../../Hooks/useSelectedCity";
import * as Location from "expo-location";

const UtilitiesFunctions = () => {
  const { selectedCity, setSelectedCity } = useSelectedCity();
  const { latitude, longitude } = useLocation();

  // console.log(latitude, longitude)
  // // Function to determine city based on latitude and longitude
  // const fetchCityFromCoordinates = async (latitude, longitude) => {
  //   try {
  //     const locationInfo = await Location.reverseGeocodeAsync({
  //       latitude,
  //       longitude,
  //     });
  //     if (locationInfo) {
  //       const { city } = locationInfo[0];
  //       console.log("CITY ISS", city);
  //       return city;
  //     } else {
  //       console.error("No location information found.");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching city:", error);
  //     return null;
  //   }
  // };

  // const determineCityFromLocation = async () => {
  //   try {
  //     // Use an API or any method to fetch city based on latitude and longitude
  //     const city = await fetchCityFromCoordinates(latitude, longitude); // Implement this function
  //     if (city) {
  //       console.log("CITY ISS", city);
  //       setSelectedCity(city); // Set the selected city based on the user's location
  //     }
  //   } catch (error) {
  //     console.error("Error fetching city:", error);
  //   }
  // };


  // useEffect(() => {
  //   determineCityFromLocation();
  // }, [latitude, longitude, selectedCity, setSelectedCity]);

  const filterDataByCity = (data) => {
    // Filter data based on the selected city or live location
    return data.filter((item) => {
      const isSameCity = item && item?.city === selectedCity;
      const isNearby =
        latitude &&
        longitude &&
        item &&
        calculateDistance(latitude, longitude, item.lat, item.long) <= 10; // Adjust the distance threshold as needed

      // Show the item if it's the selected city or nearby, or if neither city nor location is selected
      return (
        isSameCity || isNearby || (!selectedCity && !latitude && !longitude)
      );
    });
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const calculateDistance = (userLat, userLong, itemLat, itemLong) => {
    if (
      userLat === undefined ||
      userLong === undefined ||
      itemLat === undefined ||
      itemLong === undefined
    ) {
      return NaN; // Handle the case when location data is not available
    }

    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(itemLat - userLat);
    const dLon = deg2rad(itemLong - userLong);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(userLat)) *
        Math.cos(deg2rad(itemLat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  return { filterDataByCity, calculateDistance, deg2rad };
};

export default UtilitiesFunctions;
