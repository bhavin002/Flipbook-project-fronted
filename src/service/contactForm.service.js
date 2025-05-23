import ApiClient from "@/utils/ApiClient"

export const createContactFormApi = async (data) => {
    const response = await ApiClient().post("/contact-form/create", data);
    return response.data;
}

export const getContactFormApi = async (contactFormId) => {
    const response = await ApiClient().get(`/contact-form/get/${contactFormId}`);
    return response.data;
}

export const updateContactFormApi = async (contactFormId, data) => {
    const response = await ApiClient().put(`/contact-form/update/${contactFormId}`, data);
    return response.data;
}