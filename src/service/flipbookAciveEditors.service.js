import ApiClient from "@/utils/ApiClient";

export const CreateFlipbookActiveEditor = async (data) => {
    const response = await ApiClient().post("/flipbook-active-editors/create", data);
    return response.data;
}

export const ReplaceFlipbookActiveEditor = async (data) => {
    const response = await ApiClient().post("/flipbook-active-editors/replace", data);
    return response.data;
}

export const DeleteFlipbookActiveEditor = async (data) => {
    const response = await ApiClient().post("/flipbook-active-editors/remove", data);
    return response.data;
}