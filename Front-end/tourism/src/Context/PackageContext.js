// PackageContext.js
import React from 'react';
import { createContext, useContext, useState } from 'react';

const PackageContext = createContext();

export const usePackageContext = () => useContext(PackageContext);

export const PackageProvider = ({ children }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  return (
    <PackageContext.Provider value={{ selectedPackage, setSelectedPackage }}>
      {children}
    </PackageContext.Provider>
  );
};
