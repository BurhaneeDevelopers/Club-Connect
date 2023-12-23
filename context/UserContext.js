import React, { createContext, useReducer } from "react";

// Define your context
export const UserContext = createContext();

// Define your reducer function (userReducer) to update the user data
const userReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [userData, dispatch] = useReducer(userReducer, {});

  return (
    <UserContext.Provider value={{ userData, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
