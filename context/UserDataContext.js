// useUserData.js
import { useState, createContext, useContext } from "react";

const UserDataContext = createContext();

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const updateUser = (newUserData) => {
    setUserData(newUserData);
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserDataContext.Provider>
  );
};
