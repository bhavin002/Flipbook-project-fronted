import React, { createContext, useContext, useState } from 'react';

const FileUploadContext = createContext();

export function FileUploadProvider({ children }) {
  const [files, setFiles] = useState([]);

  const resetFiles = () => setFiles([]);

  return (
    <FileUploadContext.Provider value={{ files, setFiles, resetFiles }}>
      {children}
    </FileUploadContext.Provider>
  );
}

export function useFileUpload() {
  const context = useContext(FileUploadContext);
  if (!context) {
    throw new Error('useFileUpload must be used within a FileUploadProvider');
  }
  return context;
} 
