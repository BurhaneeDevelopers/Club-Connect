import useLocation from "../../Hooks/useLocation";
import useSelectedCity from "../../Hooks/useSelectedCity";

const UtilitiesFunctions = () => {
  const { selectedCity } = useSelectedCity();
  const { latitude, longitude } = useLocation();

  const filterDataByCity = (data) => {
    // Filter data based on the selected city or live location
    return data.filter((item) => {
      const isSameCity = item && item.city === selectedCity;
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

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  return { filterDataByCity, calculateDistance, deg2rad };
};

export default UtilitiesFunctions;
