import ApiClient from "@/utils/ApiClient";


export const GetTemplateApi = async (templateId, loader = true) => {
    const response = await ApiClient().get(`/template/get/${templateId}`, {
        showLoader: loader
    });
    return response.data;
}

export const EditTemplateApi = async (templateId, data) => {
    const response = await ApiClient().put(`/template/edit/${templateId}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const CreateAdminTemplateApi = async (data) => {
    const response = await ApiClient().post("/template/create", data);
    return response.data;
}

export const GetTemplatesByLayoutApi = async (data) => {
    const response = await ApiClient().post(`/template/get-by-layout`,data);
    return response.data;
}

export const GetAllTemplates = async (type) => {
    const response = await ApiClient().get(type ? `/template/get-all?type=${type}` : `/template/get-all`);
    return response.data;
}

export const GetThumbnailApi = async (templateId) => {
    const response = await ApiClient().get(`/template/get-thumbnail/${templateId}`);
    return response.data;
}

export const GetPageByIndexApi = async (templateId, index) => {
    const response = await ApiClient().get(`/template/get-page/${templateId}?page=${index}`);
    return response.data;
}