import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [userEditedData, setUserEditedData] = useState(null);

  // Fetch userEditedData from AsyncStorage when the context provider mounts
  useEffect(() => {
    const fetchUserEditedData = async () => {
      try {
        const data = await AsyncStorage.getItem("userEditedData");
        if (data) {
          const userData = JSON.parse(data);
          setUserEditedData(userData);
        }
      } catch (error) {
        console.error("Error fetching user data from AsyncStorage: ", error);
      }
    };

    fetchUserEditedData();
  }, []);

  return (
    <UserContext.Provider value={userEditedData}>
      {children}
    </UserContext.Provider>
  );
};
