import ApiClient from "@/utils/ApiClient"

export const GetWorkspaceFontsApi = async () => {
    const response = await ApiClient().get("/workspace-font/get");
    return response.data;
}

export const UpdateWorkspaceFontsApi = async (fontId,data) => {
    const response = await ApiClient().post(`/workspace-font/update/${fontId}`, data);
    return response.data;
}