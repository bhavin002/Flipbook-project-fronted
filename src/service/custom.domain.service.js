import ApiClient from "@/utils/ApiClient";

export const ResolveDomainApi = async () => {
    const host = window.location.host.split(":")[0];
    const path = window.location.pathname;
    const response = await ApiClient().get(`/custom-domain/resolve?host=${host}&path=${path}`);
    return response.data;
};

export const AddDomainApi = async (data) => {
    const response = await ApiClient().post("/custom-domain/add", data, {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    });
    return response.data;
};

export const GetDomainsApi = async () => {
    const response = await ApiClient().get("/custom-domain/list");
    return response.data;
};

export const VerifyDomainApi = async (domainId) => {
    const response = await ApiClient().post(`/custom-domain/verify/${domainId}`);
    return response.data;
};

export const SetDefaultFlipbookApi = async (domainId, flipbookId) => {
    const response = await ApiClient().put(`/custom-domain/set-default/${domainId}`, { flipbookId });
    return response.data;
};

export const DeleteDomainApi = async (domainId) => {
    const response = await ApiClient().delete(`/custom-domain/delete/${domainId}`);
    return response.data;
};

export const GetDomainConfigApi = async () => {
    const response = await ApiClient().get("/custom-domain/config");
    return response.data;
};
