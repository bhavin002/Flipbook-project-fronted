import React, { createContext, useContext, useState, useEffect } from "react";
import { GetWorkspacesApi } from "@/service/workspace.service";
import { toast } from "sonner";

const WorkspaceContext = createContext();

export const useWorkspaces = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspaces must be used within a WorkspaceProvider");
  }
  return context;
};

export const WorkspaceProvider = ({ children }) => {
  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState(null);

  const fetchWorkspaces = async (force = false) => {
    if (!lastFetched || force) {
      setIsLoading(true);
      try {
        const response = await GetWorkspacesApi();
        setWorkspaces(response.data || []);
        setLastFetched(new Date());
      } catch (error) {
        toast.error("Failed to fetch workspaces", {
          description: error.message || "Oops! Something went wrong.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <WorkspaceContext.Provider value={{ workspaces, isLoading, fetchWorkspaces }}>
      {children}
    </WorkspaceContext.Provider>
  );
};