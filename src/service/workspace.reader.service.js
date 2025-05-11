import ApiClient from "@/utils/ApiClient"

export const GetWorkspaceReadersApi = async () => {
    const response = await ApiClient().get("/workspace-reader/get");
    return response.data;
}

export const AddReaderApi = async (data) => {
    const response = await ApiClient().post("/workspace-reader/create", data);
    return response.data;
}

export const ResendReaderTokenApi = async (readerId) => {
    const response = await ApiClient().get(`/workspace-reader/resend-token/${readerId}`);
    return response.data;
}

export const VerifyReaderTokenApi  = async (token) => {
    const response = await ApiClient().get(`/workspace-reader/verify-reader/${token}`,{
        showLoader: true
    });
    return response.data;
}

export const DeleteReadersApi = async (data) => {
    const response = await ApiClient().post("/workspace-reader/delete", data);
    return response.data;
}
