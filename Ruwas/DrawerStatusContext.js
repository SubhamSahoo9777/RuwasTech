// DrawerStatusContext.js
import React, { createContext, useContext, useState } from 'react';

const DrawerStatusContext = createContext();

export const DrawerStatusProvider = ({ children }) => {
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <DrawerStatusContext.Provider value={{ isDrawerOpen, setIsDrawerOpen }}>
      {children}
    </DrawerStatusContext.Provider>
  );
};

export const useDrawerStatus = () => {
  const context = useContext(DrawerStatusContext);
  if (context === undefined) {
    throw new Error('useDrawerStatus must be used within a DrawerStatusProvider');
  }
  return context;
};
