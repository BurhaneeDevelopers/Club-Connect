import React, { createContext, useContext, useState } from "react";

// Create an AuthContext to manage user sign-in state
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userSignedIn, setUserSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ userSignedIn, setUserSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
