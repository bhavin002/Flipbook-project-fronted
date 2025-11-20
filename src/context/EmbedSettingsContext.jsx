import React, { createContext, useContext, useState } from 'react';

const EmbedSettingsContext = createContext();

export const useEmbedSettings = () => {
  const context = useContext(EmbedSettingsContext);
  if (!context) {
    throw new Error('useEmbedSettings must be used within an EmbedSettingsProvider');
  }
  return context;
};

export const EmbedSettingsProvider = ({ children }) => {
  const [height, setHeight] = useState(480);
  const [startPage, setStartPage] = useState('1');

  return (
    <EmbedSettingsContext.Provider value={{
      height,
      setHeight,
      startPage,
      setStartPage
    }}>
      {children}
    </EmbedSettingsContext.Provider>
  );
};
