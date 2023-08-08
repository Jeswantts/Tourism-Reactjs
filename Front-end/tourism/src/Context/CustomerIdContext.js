import { createContext, useContext, useState } from 'react';
import React from 'react';
import { useEffect } from 'react';

const CustomerIdContext = createContext();

export const useCustomerId = () => useContext(CustomerIdContext);

export const CustomerIdProvider = ({ children }) => {
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    const storedCustomerId = localStorage.getItem('customerId');
    if (storedCustomerId) {
      setCustomerId(storedCustomerId);
    }
  }, []);

  // Update the stored customer ID in localStorage whenever it changes
  useEffect(() => {
    if (customerId) {
      localStorage.setItem('customerId', customerId);
    } else {
      localStorage.removeItem('customerId');
    }
  }, [customerId]);


  return (
    <CustomerIdContext.Provider value={{ customerId, setCustomerId }}>
      {children}
    </CustomerIdContext.Provider>
  );
};
