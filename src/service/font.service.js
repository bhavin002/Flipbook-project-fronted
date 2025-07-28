import ApiClient from "@/utils/ApiClient"

export const GetWorkspaceFontsApi = async () => {
    const response = await ApiClient().get("/workspace-font/get");
    return response.data;
}
    