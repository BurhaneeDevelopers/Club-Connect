import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem("cachedData");

      if (cachedData) {
        setData(JSON.parse(cachedData));
        setIsLoading(false);
      } else {
        const options = {
          method: "POST",
          url: "https://countriesnow.space/api/v0.1/countries/cities",
          data: {
            country: "India",
          },
        };

        const response = await axios.request(options);
        const responseData = response.data.data;

        // Store the fetched data in AsyncStorage for future use
        await AsyncStorage.setItem("cachedData", JSON.stringify(responseData));
        console.log(responseData);

        setData(responseData);
        setIsLoading(false);
      }
    } catch (error) {
      setError(error);
      console.log("Error: " + error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
