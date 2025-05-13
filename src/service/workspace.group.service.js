import ApiClient from "@/utils/ApiClient"

export const GetWorkspaceGroupsApi = async () => {
    const response = await ApiClient().get("/workspace-group/get");
    return response.data;
}

export const CreateWorkspaceGroupApi = async (data) => {
    const response = await ApiClient().post("/workspace-group/create", data);
    return response.data;
}

export const DeleteWorkspaceGroupsApi = async (data) => {
    const response = await ApiClient().post("/workspace-group/delete", data);
    return response.data;
}