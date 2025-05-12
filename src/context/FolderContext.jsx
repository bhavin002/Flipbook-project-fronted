import React, { createContext, useContext, useState, useEffect } from "react";
import { GetWorkspaceFoldersApi } from "@/service/folder.service";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

// Create the context
const FolderContext = createContext();

// Custom hook to use the folder context
export const useFolders = () => {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }
  return context;
};

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {isAuthenticated} = useAuth();
  
  const fetchFolders = async () => {
    setIsLoading(true);
    try {
      const response = await GetWorkspaceFoldersApi();
      setFolders(response.data);
    } catch (error) {
      toast.error("Folder fetch failed", {
        description: error.message || "Oops! Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load of folders
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchFolders();
  }, []);

  // Function to add a new folder
  const addFolder = (newFolder) => {
    setFolders((prevFolders) => [...prevFolders, newFolder]);
  };

  // Function to update a folder's properties
  const updateFolder = (updatedFolder) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder._id === updatedFolder._id ? updatedFolder : folder
      )
    );
  };

  // Function to remove a folder
  const removeFolder = (folderId) => {
    setFolders((prevFolders) =>
      prevFolders.filter((folder) => folder._id !== folderId)
    );
  };

  // Get folders by scope
  const getNormalFolders = () => folders.filter(folder => folder.folderScope === 0);
  const getTemplateFolders = () => folders.filter(folder => folder.folderScope === 1);
  
  // Function to refresh the folder list from the API
  const refreshFolders = () => {
    fetchFolders();
  };

  // The value that will be provided to consumers of this context
  const value = {
    folders,
    isLoading,
    addFolder,
    updateFolder,
    removeFolder,
    refreshFolders,
    getNormalFolders,
    getTemplateFolders
  };

  return (
    <FolderContext.Provider value={value}>
      {children}
    </FolderContext.Provider>
  );
};

export default FolderContext;