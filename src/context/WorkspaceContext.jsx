import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
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

  console.log("workspaces ><><>",workspaces)

  // Compute MyWorkspace ID (workspace where user is owner)
  const myWorkspaceId = useMemo(() => {
    const myWorkspace = workspaces.find(workspace => workspace.isOwner);
    return myWorkspace?._id || null;
  }, [workspaces]);

  // Compute current workspace
  const currentWorkspace = useMemo(() => {
    return workspaces.find(workspace => workspace.isCurrent) || workspaces[0];
  }, [workspaces]);

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
    <WorkspaceContext.Provider value={{ 
      workspaces, 
      isLoading, 
      fetchWorkspaces, 
      setIsNeededRefetch,
      myWorkspaceId,
      currentWorkspace
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};