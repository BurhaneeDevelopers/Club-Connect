import React, { createContext, useContext, useState } from "react";

const CafeContext = createContext();

export const CafeProvider = ({ children }) => {
  const [selectedCafeId, setSelectedCafeId] = useState(null);

  return (
    <CafeContext.Provider value={{ selectedCafeId, setSelectedCafeId }}>
      {children}
    </CafeContext.Provider>
  );
};

export const useCafeContext = () => useContext(CafeContext);
