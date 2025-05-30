import ApiClient from "@/utils/ApiClient"


export const GetWorkspacesApi = async () => {
    const response = await ApiClient().get("/workspace/workspaces");
    return response.data;
}

export const UpdateWorkspaceApi = async (data) => {
    const response = await ApiClient().post("/workspace-profile/update", data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const GetWorkspaceInfoApi = async () => {
    const response = await ApiClient().get("/workspace-profile/get-info");
    return response.data;
}

export const getWorkspaceProfileApi = async () => {
    const response = await ApiClient().get(`/workspace-profile/get`, {
        showLoader: true
    });
    return response.data;
}