import { useAuth } from '@/context/AuthContext';
import { useWorkspaces } from '@/context/WorkspaceContext';

export function useTrialExpiration() {
    const { userMeta } = useAuth();
    const { currentWorkspace } = useWorkspaces();

    const workspaceInfo = userMeta.workspaceInfo?.find(ws => ws.workspaceId === currentWorkspace?._id);
    const daysToExpire = workspaceInfo?.daysToExpire;
    const isExpired = workspaceInfo?.isExpired;

    const shouldShowBanner = daysToExpire && daysToExpire > 0 && !isExpired;

    return {
        daysToExpire,
        isExpired,
        shouldShowBanner
    };
}




