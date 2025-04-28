import ApiClient from "@/utils/ApiClient"

export const CreateWorkspaceFolderApi = async (data) => {
    const response = await ApiClient().post("/workspace-folder/create", data);
    return response.data;
}

export const GetWorkspaceFoldersApi = async () => {
    const response = await ApiClient().get("workspace-folder/get-folder");
    return response.data;
}