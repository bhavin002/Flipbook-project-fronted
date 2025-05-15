import ApiClient from "@/utils/ApiClient"


export const GetWorkspacesApi = async () => {
    const response = await ApiClient().get("/workspace/workspaces");
    return response.data;
}