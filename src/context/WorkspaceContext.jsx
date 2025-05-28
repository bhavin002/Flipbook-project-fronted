import React, { createContext, useContext, useState, useEffect } from "react";
import { GetWorkspacesApi } from "@/service/workspace.service";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

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
  const [isNeededRefetch, setIsNeededRefetch] = useState(false);
  const { isAuthenticated } = useAuth();


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
    if (!isAuthenticated) return;
    if (isNeededRefetch) {
      fetchWorkspaces(true);
      setIsNeededRefetch(false);
    } else {
      fetchWorkspaces();
    }
  }, [isNeededRefetch, isAuthenticated]);

  return (
    <WorkspaceContext.Provider value={{ workspaces, isLoading, fetchWorkspaces, setIsNeededRefetch }}>
      {children}
    </WorkspaceContext.Provider>
  );
};